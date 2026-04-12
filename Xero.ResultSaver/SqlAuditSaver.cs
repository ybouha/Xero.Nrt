using System.Data;
using Dapper;
using Microsoft.Data.SqlClient;
using Xero.SmartComparer;

namespace Xero.ResultSaver;

/// <summary>
/// Writes a single summary row per NRT run to a SQL Server audit table.
/// The table is created automatically on first use if it does not exist,
/// giving teams an out-of-the-box audit trail with zero DBA setup.
/// </summary>
/// <remarks>
/// Table schema (auto-created):
/// <code>
/// NrtAuditLog (
///     Id                   INT IDENTITY PRIMARY KEY,
///     ScenarioName         NVARCHAR(200),
///     ReferenceVersion     NVARCHAR(100),
///     TargetVersion        NVARCHAR(100),
///     RunTimestamp         DATETIMEOFFSET,
///     InBothButDiffCount   INT,
///     OnlyInReferenceCount INT,
///     OnlyInTargetCount    INT,
///     Passed               BIT
/// )
/// </code>
/// </remarks>
public sealed class SqlAuditSaver<T> : IResultSaver<T> where T : class, new()
{
    private readonly string _connectionString;

    public SqlAuditSaver(string connectionString) => _connectionString = connectionString;

    public async Task SaveAsync(CompareResult<T> result, SaveOptions options, CancellationToken ct = default)
    {
        bool passed = result.Count == 0
            && (result.OnlyInReference?.Count ?? 0) == 0
            && (result.OnlyInTarget?.Count ?? 0) == 0;

        using var conn = new SqlConnection(_connectionString);

        await EnsureTableExistsAsync(conn, ct);

        await conn.ExecuteAsync(new CommandDefinition(
            """
            INSERT INTO NrtAuditLog
                (ScenarioName, ReferenceVersion, TargetVersion, RunTimestamp,
                 InBothButDiffCount, OnlyInReferenceCount, OnlyInTargetCount, Passed)
            VALUES
                (@ScenarioName, @ReferenceVersion, @TargetVersion, @RunTimestamp,
                 @InBothButDiffCount, @OnlyInReferenceCount, @OnlyInTargetCount, @Passed)
            """,
            new
            {
                options.ScenarioName,
                options.ReferenceVersion,
                options.TargetVersion,
                options.RunTimestamp,
                InBothButDiffCount   = result.Count,
                OnlyInReferenceCount = result.OnlyInReference?.Count ?? 0,
                OnlyInTargetCount    = result.OnlyInTarget?.Count ?? 0,
                Passed               = passed
            },
            cancellationToken: ct));

        Console.WriteLine($"[SqlAuditSaver] Run logged → NrtAuditLog  Passed={passed}");
    }

    private static async Task EnsureTableExistsAsync(IDbConnection conn, CancellationToken ct)
    {
        await conn.ExecuteAsync(new CommandDefinition(
            """
            IF NOT EXISTS (SELECT 1 FROM sys.objects WHERE object_id = OBJECT_ID(N'NrtAuditLog') AND type = 'U')
            CREATE TABLE NrtAuditLog (
                Id                   INT IDENTITY PRIMARY KEY,
                ScenarioName         NVARCHAR(200)    NOT NULL,
                ReferenceVersion     NVARCHAR(100)    NOT NULL DEFAULT '',
                TargetVersion        NVARCHAR(100)    NOT NULL DEFAULT '',
                RunTimestamp         DATETIMEOFFSET   NOT NULL,
                InBothButDiffCount   INT              NOT NULL,
                OnlyInReferenceCount INT              NOT NULL,
                OnlyInTargetCount    INT              NOT NULL,
                Passed               BIT              NOT NULL
            )
            """,
            cancellationToken: ct));
    }
}
