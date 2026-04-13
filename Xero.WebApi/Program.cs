using System.Data;
using Npgsql;
using Xero.DataAcquisition;
using Xero.WebApi.Data;
using Xero.WebApi.Models;
using Xero.WebApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ?? Services ??????????????????????????????????????????????????????????????????

builder.Services.AddControllers();
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

// ?? Audit DB (nrt_runs table) ?????????????????????????????????????????????????

var auditConnStr = builder.Configuration["AuditDb:ConnectionString"]
    ?? throw new InvalidOperationException("AuditDb:ConnectionString is not configured.");

var auditProviderStr = builder.Configuration["AuditDb:Provider"] ?? "PostgreSql";
var auditProvider    = Enum.Parse<DbProvider>(auditProviderStr, ignoreCase: true);

IDbConnectionFactory auditFactory = auditProvider == DbProvider.PostgreSql
    ? PostgreSqlConnectionFactory.Instance
    : SqlServerConnectionFactory.Instance;

builder.Services.AddSingleton(new NrtRunRepository(auditFactory, auditConnStr));
builder.Services.AddScoped<INrtService, NrtService>();

// ?? Results DB (NrtDiffResults table) ??????????????????????????????????????????

var connStr = builder.Configuration["Db:ConnectionString"]
    ?? throw new InvalidOperationException("Db:ConnectionString is not configured.");

// IDbConnection registered as scoped; NpgsqlConnection implements IDbConnection.
builder.Services.AddScoped<IDbConnection>(_ => new NpgsqlConnection(connStr));
builder.Services.AddScoped<INrtResultService, NrtResultService>();

builder.Services.AddCors(o => o.AddPolicy("Angular",
    p => p.WithOrigins("http://localhost:4200")
          .AllowAnyHeader().AllowAnyMethod()));

// ?? Pipeline ??????????????????????????????????????????????????????????????????

var app = builder.Build();

app.UseCors("Angular");
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Xero NRT Web API v1");
    c.RoutePrefix = string.Empty;   // Swagger UI at root
});

app.UseAuthorization();
app.MapControllers();

app.Run();
