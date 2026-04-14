using System.Data;
using System.Text.Json.Serialization;
using Npgsql;
using Serilog;
using Xero.DataAcquisition;
using Xero.Logging;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using Xero.WebApi.Services;

// ── Bootstrap logger (captures startup errors before the host is built) ────────

SerilogHelper.CreateLogger("Xero.WebApi");

try
{
    var builder = WebApplication.CreateBuilder(args);

    // Wire Serilog into the ASP.NET Core host so every ILogger<T> resolves to Serilog
    builder.Host.UseSerilog(Log.Logger);

    // ── Services ───────────────────────────────────────────────────────────────

    builder.Services.AddControllers()
        .AddJsonOptions(opts =>
            opts.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter()));
    builder.Services.AddEndpointsApiExplorer();
    builder.Services.AddSwaggerGen(c =>
    {
        c.SwaggerDoc("v1", new()
        {
            Title       = "Xero NRT Web API",
            Version     = "v1",
            Description = "Triggers NRT comparison runs, exposes run history, and inspects diff results.",
        });
        var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
        var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
        if (File.Exists(xmlPath))
            c.IncludeXmlComments(xmlPath);
    });

    // ── Audit DB (nrt_runs table) ──────────────────────────────────────────────

    var auditConnStr = builder.Configuration["AuditDb:ConnectionString"]
        ?? throw new InvalidOperationException("AuditDb:ConnectionString is not configured.");

    var auditProviderStr = builder.Configuration["AuditDb:Provider"] ?? "PostgreSql";
    var auditProvider    = Enum.Parse<DbProvider>(auditProviderStr, ignoreCase: true);

    IDbConnectionFactory auditFactory = auditProvider == DbProvider.PostgreSql
        ? PostgreSqlConnectionFactory.Instance
        : SqlServerConnectionFactory.Instance;

    builder.Services.AddSingleton(new NrtRunRepository(auditFactory, auditConnStr));
    builder.Services.AddScoped<INrtService, NrtService>();

    // ── Results DB (NrtDiffResults table) ─────────────────────────────────────

    var connStr = builder.Configuration["Db:ConnectionString"]
        ?? throw new InvalidOperationException("Db:ConnectionString is not configured.");

    builder.Services.AddScoped<IDbConnection>(_ => new NpgsqlConnection(connStr));
    builder.Services.AddScoped<INrtResultService, NrtResultService>();

    builder.Services.AddCors(o => o.AddPolicy("Angular",
        p => p.WithOrigins("http://localhost:4200")
              .AllowAnyHeader().AllowAnyMethod()));

    // ── Pipeline ───────────────────────────────────────────────────────────────

    var app = builder.Build();

    // ── Database migrations ────────────────────────────────────────────────────
    var repo = app.Services.GetRequiredService<NrtRunRepository>();
    await repo.EnsureSchemaAsync();

    app.UseSerilogRequestLogging(opts =>
    {
        opts.MessageTemplate =
            "HTTP {RequestMethod} {RequestPath} responded {StatusCode} in {Elapsed:0.0}ms";
    });

    app.UseCors("Angular");
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Xero NRT Web API v1");
        c.RoutePrefix = string.Empty;
    });

    app.UseAuthorization();
    app.MapControllers();

    app.Run();

    return 0;
}
catch (Exception ex)
{
    Log.Fatal(ex, "Xero.WebApi terminated unexpectedly");
    return 1;
}
finally
{
    SerilogHelper.CloseAndFlush();
}
