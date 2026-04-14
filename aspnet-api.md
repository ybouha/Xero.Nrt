# ASP.NET Core Web API Expert Rules

## Tech Stack
- .NET 8+ (C# 12+)
- Entity Framework Core (EF Core)

## Code Standards
- Use file-scoped namespaces and implicit usings.
- Use primary constructors where applicable.
- Make all I/O bound operations fully asynchronous (`async`/`await`). Always pass `CancellationToken`.
- Avoid returning `null` for collections; return `Enumerable.Empty<T>()` or `[]`.
- Use `Records` for DTOs, Commands, and Queries (immutable data).

## Architecture & Patterns
- Implement CQRS using MediatR. Separate Read (Queries) and Write (Commands) operations.
- Use Global Exception Handling (e.g., `IExceptionHandler` or Middleware) instead of `try/catch` in controllers.
- Validate incoming requests using FluentValidation pipeline behaviors, not inside the controller.
- Keep Controllers/Minimal APIs thin. They should only handle HTTP routing, dispatching to MediatR/services, and returning `IResult`/`IActionResult`.
- Use the Options Pattern (`IOptions<T>`, `IOptionsSnapshot<T>`) for configurations. Do not inject `IConfiguration` directly into services.

## Security & Performance
- Always use parameterized queries or EF Core LINQ to prevent SQL Injection.
- Implement response caching where appropriate.
- Configure proper CORS policies and use JWT for authorization.