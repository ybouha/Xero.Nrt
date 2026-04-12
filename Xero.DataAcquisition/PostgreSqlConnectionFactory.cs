using System.Data;
using Npgsql;

namespace Xero.DataAcquisition;

/// <summary>
/// Creates <see cref="NpgsqlConnection"/> instances for PostgreSQL.
/// Use the singleton <see cref="Instance"/> to avoid repeated allocations.
/// </summary>
public sealed class PostgreSqlConnectionFactory : IDbConnectionFactory
{
    public static readonly PostgreSqlConnectionFactory Instance = new();

    private PostgreSqlConnectionFactory() { }

    public DbDialect Dialect => DbDialect.PostgreSql;

    public IDbConnection CreateConnection(string connectionString)
        => new NpgsqlConnection(connectionString);
}
