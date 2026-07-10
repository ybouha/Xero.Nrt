using System.Collections.Concurrent;
using System.Text.Json;
using Couchbase;
using Couchbase.Core.IO.Serializers;

namespace Xero.DataAcquisition;

/// <summary>
/// Caches long-lived <see cref="ICluster"/> instances keyed by connection string,
/// per Couchbase SDK guidance that clusters should be created once and reused
/// rather than opened/closed per query.
/// </summary>
public static class CouchbaseClusterProvider
{
    private static readonly ConcurrentDictionary<string, Lazy<Task<ICluster>>> _clusters = new();

    public static Task<ICluster> GetAsync(string connectionString)
    {
        var lazy = _clusters.GetOrAdd(
            connectionString,
            cs => new Lazy<Task<ICluster>>(
                () => ConnectAsync(cs),
                LazyThreadSafetyMode.ExecutionAndPublication));

        return lazy.Value;
    }

    private static async Task<ICluster> ConnectAsync(string connectionString)
    {
        var (endpoint, username, password) = ParseConnectionString(connectionString);

        var options = new ClusterOptions
        {
            ConnectionString = endpoint,
            UserName = username,
            Password = password,
        };

        // N1QL result field names come from the query's own aliases; matching them
        // case-insensitively to T's properties keeps behavior consistent with
        // DbDataLoader<T>'s lenient column→property mapping.
        options.WithSerializer(SystemTextJsonSerializer.Create(
            new JsonSerializerOptions { PropertyNameCaseInsensitive = true }));

        return await Cluster.ConnectAsync(options);
    }

    /// <summary>
    /// Parses a semicolon-delimited connection string, e.g.
    /// <c>Endpoint=couchbase://localhost;Username=Administrator;Password=secret</c>.
    /// <c>Server</c>/<c>UID</c>/<c>PWD</c> are accepted aliases for
    /// <c>Endpoint</c>/<c>Username</c>/<c>Password</c>.
    /// </summary>
    private static (string Endpoint, string Username, string Password) ParseConnectionString(string connectionString)
    {
        var values = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        foreach (var part in connectionString.Split(';', StringSplitOptions.RemoveEmptyEntries))
        {
            var idx = part.IndexOf('=');
            if (idx <= 0) continue;
            values[part[..idx].Trim()] = part[(idx + 1)..].Trim();
        }

        string? Get(params string[] keys) =>
            keys.Select(k => values.TryGetValue(k, out var v) ? v : null).FirstOrDefault(v => v is not null);

        var endpoint = Get("Endpoint", "Server");
        var username = Get("Username", "UID");
        var password = Get("Password", "PWD");

        if (string.IsNullOrWhiteSpace(endpoint) || string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(password))
        {
            throw new FormatException(
                "Couchbase connection string must specify Endpoint (or Server), Username (or UID), and Password (or PWD), " +
                "e.g. \"Endpoint=couchbase://localhost;Username=Administrator;Password=secret\".");
        }

        return (endpoint, username, password);
    }
}
