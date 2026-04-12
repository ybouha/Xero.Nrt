using System.Data;
using Microsoft.Data.SqlClient;

namespace Xero.DataAcquisition;

/// <summary>
/// Creates <see cref="SqlConnection"/> instances for SQL Server / Azure SQL.
/// Use the singleton <see cref="Instance"/> to avoid repeated allocations.
/// </summary>
public sealed class SqlServerConnectionFactory : IDbConnectionFactory
{
    public static readonly SqlServerConnectionFactory Instance = new();

    private SqlServerConnectionFactory() { }

    public DbDialect Dialect => DbDialect.SqlServer;

    public IDbConnection CreateConnection(string connectionString)
        => new SqlConnection(connectionString);
}
