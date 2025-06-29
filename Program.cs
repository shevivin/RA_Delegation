using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using RA_Delegation.Interfaces;
using RA_Delegation.Repositories;
using RA_Delegation.Services;

var builder = WebApplication.CreateBuilder(args);

// Configure CORS to allow requests from the React development server
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // React dev server
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register services for dependency injection
builder.Services.AddScoped<IDelegationService, DelegationService>();
builder.Services.AddScoped<IAuthorizationRepository, MockAuthorizationRepository>();

// Add support for controllers (API endpoints)
builder.Services.AddControllers();

// (Optional) Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

// Enable CORS before authorization and routing
app.UseCors("AllowReactApp");

// Force HTTPS redirection (optional, useful in production)
app.UseHttpsRedirection();

// Enable authorization middleware (if applicable)
app.UseAuthorization();

// Map controller routes (API endpoints)
app.MapControllers();

// Run the application
app.Run();