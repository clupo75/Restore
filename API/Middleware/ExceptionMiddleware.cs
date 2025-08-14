using System;
using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Mvc;

namespace API.Middleware;

// This middleware is used to handle exceptions globally in the API.
// It captures exceptions thrown during the request processing pipeline and can log them or return a custom error response.
public class ExceptionMiddleware(IHostEnvironment env, ILogger<ExceptionMiddleware> logger) : IMiddleware
{
    public async Task InvokeAsync(HttpContext context, RequestDelegate next)
    {
        try
        {
            // Call the next middleware in the pipeline
            await next(context);
        }
        catch (Exception ex)
        {

            await HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        // Log the exception
        logger.LogError(ex, ex.Message);
        // Set the response status code and content type
        context.Response.ContentType = "application/json";
        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

        // Create a ProblemDetails response object
        // This is a standard way to represent errors in APIs, especially in ASP.NET Core
        var response = new ProblemDetails
        {
            Status = 500,
            Detail = env.IsDevelopment() ? ex.StackTrace?.ToString() : null,
            Title = ex.Message
        };

        // set the response options for JSON serialization to use camel case
        var options = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        // Write the JSON response to the context
        var json = JsonSerializer.Serialize(response, options);
        
        // write the JSON response to the HTTP response body
        await context.Response.WriteAsync(json);
    }
}
