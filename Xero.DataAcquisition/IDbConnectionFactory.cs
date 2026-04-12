using System.Data;

namespace Xero.DataAcquisition;

/// <summary>
/// Abstract factory that decouples data-access code from any specific ADO.NET provider.
/// Implement this interface once per database engine; inject the right factory at startup.
/// </summary>
public interface IDbConnectionFactory
{
    /// <summary>SQL dialect produced by connections from this factory.</summary>
    DbDialect Dialect { get; }

    /// <summary>Opens (or returns a closed, ready-to-open) connection for the given connection string.</summary>
    IDbConnection CreateConnection(string connectionString);
}
