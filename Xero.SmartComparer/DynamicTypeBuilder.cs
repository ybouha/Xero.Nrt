using System.Reflection;
using System.Reflection.Emit;

namespace Xero.SmartComparer;

/// <summary>
/// Generates concrete CLR types at runtime from a <see cref="ColumnDef"/> schema using IL Emit.
///
/// The emitted type:
/// <list type="bullet">
///   <item>Is a public, non-abstract class.</item>
///   <item>Has a public default constructor (satisfies <c>where T : class, new()</c>).</item>
///   <item>Has one public get/set property per <see cref="ColumnDef"/> entry.</item>
///   <item>Works with Dapper's <c>QueryAsync&lt;T&gt;</c> (column-name mapping).</item>
///   <item>Works with <c>System.Linq.Expressions</c> property getters (used by ListComparer).</item>
/// </list>
///
/// Generated types are cached by a canonical schema fingerprint so each unique column
/// set is emitted only once per process lifetime.
/// </summary>
public static class DynamicTypeBuilder
{
    private static readonly object _lock = new();
    private static readonly Dictionary<string, Type> _cache = new(StringComparer.Ordinal);

    private static readonly ModuleBuilder _module;

    static DynamicTypeBuilder()
    {
        var assemblyName = new AssemblyName("Xero.DynamicTypes");
        var assemblyBuilder = AssemblyBuilder.DefineDynamicAssembly(
            assemblyName, AssemblyBuilderAccess.Run);
        _module = assemblyBuilder.DefineDynamicModule("DynamicTypes");
    }

    /// <summary>
    /// Returns (or creates) a CLR type whose public properties match <paramref name="schema"/>.
    /// </summary>
    /// <param name="schema">Column definitions. Order is preserved in the generated type.</param>
    /// <returns>A <see cref="Type"/> satisfying <c>where T : class, new()</c>.</returns>
    public static Type Build(ColumnDef[] schema)
    {
        if (schema is null || schema.Length == 0)
            throw new ArgumentException("Schema must contain at least one column.", nameof(schema));

        var fingerprint = BuildFingerprint(schema);

        lock (_lock)
        {
            if (_cache.TryGetValue(fingerprint, out var cached))
                return cached;

            var type = EmitType(schema, fingerprint);
            _cache[fingerprint] = type;
            return type;
        }
    }

    // ── Private helpers ────────────────────────────────────────────────────────

    /// <summary>
    /// Canonical key: columns sorted by name so that reordering produces the same type.
    /// Each entry is "Name:Type".
    /// </summary>
    private static string BuildFingerprint(ColumnDef[] schema)
        => string.Join("|", schema
            .OrderBy(c => c.Name, StringComparer.OrdinalIgnoreCase)
            .Select(c => $"{c.Name}:{c.Type ?? "string"}"));

    private static Type EmitType(ColumnDef[] schema, string fingerprint)
    {
        // Use a deterministic name based on a short hash of the fingerprint
        var hash      = (uint)fingerprint.GetHashCode();
        var typeName  = $"DynRow_{hash:X8}";

        var typeBuilder = _module.DefineType(
            typeName,
            TypeAttributes.Public | TypeAttributes.Class | TypeAttributes.Sealed,
            typeof(object));

        // Default constructor — required by "where T : new()" constraint
        typeBuilder.DefineDefaultConstructor(MethodAttributes.Public);

        foreach (var col in schema)
            DefineProperty(typeBuilder, col.Name, ResolveClrType(col.Type));

        return typeBuilder.CreateType()
               ?? throw new InvalidOperationException($"Failed to create dynamic type '{typeName}'.");
    }

    private static void DefineProperty(TypeBuilder tb, string name, Type propType)
    {
        var field = tb.DefineField(
            $"_f_{name}",
            propType,
            FieldAttributes.Private);

        var prop = tb.DefineProperty(
            name,
            PropertyAttributes.HasDefault,
            propType,
            null);

        // Getter
        var getter = tb.DefineMethod(
            $"get_{name}",
            MethodAttributes.Public | MethodAttributes.SpecialName | MethodAttributes.HideBySig,
            propType,
            Type.EmptyTypes);

        var getIl = getter.GetILGenerator();
        getIl.Emit(OpCodes.Ldarg_0);
        getIl.Emit(OpCodes.Ldfld, field);
        getIl.Emit(OpCodes.Ret);

        // Setter
        var setter = tb.DefineMethod(
            $"set_{name}",
            MethodAttributes.Public | MethodAttributes.SpecialName | MethodAttributes.HideBySig,
            null,
            [propType]);

        var setIl = setter.GetILGenerator();
        setIl.Emit(OpCodes.Ldarg_0);
        setIl.Emit(OpCodes.Ldarg_1);
        setIl.Emit(OpCodes.Stfld, field);
        setIl.Emit(OpCodes.Ret);

        prop.SetGetMethod(getter);
        prop.SetSetMethod(setter);
    }

    /// <summary>Maps a schema type string to a nullable CLR type.</summary>
    private static Type ResolveClrType(string? typeName) => typeName?.ToLowerInvariant() switch
    {
        "decimal" => typeof(decimal?),
        "int"     => typeof(int?),
        "long"    => typeof(long?),
        "bool"    => typeof(bool?),
        "double"  => typeof(double?),
        _         => typeof(string),   // "string" and any unknown value
    };
}
