using System.Data;
using Npgsql;
using Xero.ResultViewerApi.Services;

var builder = WebApplication.CreateBuilder(args);

// ── Services ──────────────────────────────────────────────────────────────────

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new()
    {
        Title       = "Xero NRT Result Viewer API",
        Version     = "v1",
        Description = "Browse executed NRT runs and inspect diff results.",
    });
    var xmlFile = $"{System.Reflection.Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    if (File.Exists(xmlPath))
        c.IncludeXmlComments(xmlPath);
});

// ── Database connection (scoped — one per HTTP request) ───────────────────────

var connStr = builder.Configuration["Db:ConnectionString"]
    ?? throw new InvalidOperationException("Db:ConnectionString is not configured.");

// IDbConnection registered as scoped; NpgsqlConnection implements IDbConnection.
builder.Services.AddScoped<IDbConnection>(_ => new NpgsqlConnection(connStr));
builder.Services.AddScoped<INrtResultService, NrtResultService>();

builder.Services.AddCors(o => o.AddPolicy("Angular",
    p => p.WithOrigins("http://localhost:4200")
          .AllowAnyHeader().AllowAnyMethod()));

// ── Pipeline ──────────────────────────────────────────────────────────────────

var app = builder.Build();

app.UseCors("Angular");
app.UseSwagger();
app.UseSwaggerUI(c =>
{
    c.SwaggerEndpoint("/swagger/v1/swagger.json", "Xero NRT Result Viewer API v1");
    c.RoutePrefix = string.Empty;   // Swagger UI at root
});

app.UseAuthorization();
app.MapControllers();

app.Run();
