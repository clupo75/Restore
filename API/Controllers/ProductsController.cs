using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    // https://localhost:5001/api/products
    [Route("api/[controller]")]
    [ApiController]
    // using the primary constructor for dependency injection
    // Whena new instance of the ProductsController is created, which
    // happens when an HTTP request occurs, it instantiates a new instance of the StoreContext 
    public class ProductsController(StoreContext context) : ControllerBase
    {
        // setting our API calls to async due to network traffic
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts()
        {
            // ToList method queries the db
            return await context.Products.ToListAsync();
        }

        // api/products/2
        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            return product;
        }
    }
}
