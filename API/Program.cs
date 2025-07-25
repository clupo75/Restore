using API.Data;
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

var app = builder.Build();

// Configure the HTTP request pipeline.

// setting up CORS middleware to accept incoming traffic from our client server
app.UseCors(opt =>
{
    opt.AllowAnyHeader().AllowAnyMethod().WithOrigins("https://localhost:3000");
});

app.MapControllers();

// Initialize the Db before the application is started
DbInitializer.InitDb(app);

app.Run();
