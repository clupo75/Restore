using API.Data;
using API.Middleware;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
// Add the StoreContext connection to the application, so we can query our Db
builder.Services.AddDbContext<StoreContext>(opt =>
{
    // pass in the options from StoreContext and connect to the db. 
    // The Connection string is set in the appsettings.json/Development.json
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});

// adding the Cors service to connect the client to the server
builder.Services.AddCors();
// adding the ExceptionMiddleware to the service collection
builder.Services.AddTransient<ExceptionMiddleware>();
var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();
// setting up CORS middleware to accept incoming traffic from our client server
// use AllowCredentials to allow cookies to be sent across domains
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().AllowCredentials().WithOrigins("https://localhost:3000");
});

app.MapControllers();

// Initialize the Db before the application is started
DbInitializer.InitDb(app);

app.Run();
