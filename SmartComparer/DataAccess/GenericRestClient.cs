using Microsoft.Extensions.Logging;
using System.Diagnostics;
using System.Net.Http.Json;

public class GenericRestClient<T>
{
    private readonly HttpClient _httpClient;
    private readonly ILogger<GenericRestClient<T>> _logger;
    private readonly string _resourcePath; // The API endpoint/resource path, e.g., "api/accounts"

    public GenericRestClient(HttpClient httpClient, ILogger<GenericRestClient<T>> logger, string resourcePath)
    {
        _httpClient = httpClient;
        _logger = logger;
        _resourcePath = resourcePath;

        // Setting the timeout to 4 days
        _httpClient.Timeout = TimeSpan.FromDays(4);
    }

    public async Task<T> GetAsync(int id)
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var response = await _httpClient.GetAsync($"{_resourcePath}/{id}");
            response.EnsureSuccessStatusCode();

            _logger.LogInformation($"Successfully retrieved resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

            return await response.Content.ReadFromJsonAsync<T>();
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, $"Error retrieving resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");
            throw;
        }
    }

    public async Task<T> CreateAsync(T entity)
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var response = await _httpClient.PostAsJsonAsync(_resourcePath, entity);
            response.EnsureSuccessStatusCode();

            _logger.LogInformation($"Successfully created resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");

            return await response.Content.ReadFromJsonAsync<T>();
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, $"Error creating resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");
            throw;
        }
    }

    public async Task UpdateAsync(int id, T entity)
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var response = await _httpClient.PutAsJsonAsync($"{_resourcePath}/{id}", entity);
            response.EnsureSuccessStatusCode();

            _logger.LogInformation($"Successfully updated resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, $"Error updating resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");
            throw;
        }
    }

    public async Task DeleteAsync(int id)
    {
        var stopwatch = Stopwatch.StartNew();
        try
        {
            var response = await _httpClient.DeleteAsync($"{_resourcePath}/{id}");
            response.EnsureSuccessStatusCode();

            _logger.LogInformation($"Successfully deleted resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");
        }
        catch (HttpRequestException ex)
        {
            _logger.LogError(ex, $"Error deleting resource. Elapsed time: {stopwatch.ElapsedMilliseconds} ms");
            throw;
        }
    }
}
