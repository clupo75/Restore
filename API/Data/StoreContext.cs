using System;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;
// class will derive from the Entity Framework Class DbContext
// Set the constructor using primary constructor, which is passed like parameters to the class
// Set the options, and the options have to be passed to the deriving DbContext class as well
public class StoreContext(DbContextOptions options) : DbContext(options)
{
    // Takes our Entities C# code and translates it to SQL commands to query our Db
    public DbSet<Product> Products { get; set; }
}
