using System;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class BasketController(StoreContext context) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<BasketDto>> GetBasket()
    {
        var basket = await RetrieveBasket();

        if (basket == null) return NoContent();

        return basket.ToDto();
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        // This is a transaction that involves multiple steps, where each step depends on the previous one:
        // get the basket
        var basket = await RetrieveBasket();
        // if no basket, create one. The ??= operator assigns the right-hand value to the left-hand variable,
        // if the left-hand variable is null.
        basket ??= CreateBasket();
        // get the product to add to the basket, by the primary key (productId)
        var product = await context.Products.FindAsync(productId);
        if (product == null) return BadRequest("Product not found");
        // add the item to the basket, using the AddItem method in the Basket entity
        basket.AddItem(product, quantity);
        // save the changes to the basket. All changes that have been tracked by Entity Framework
        // are saved to the database when SaveChangesAsync is called.
        // If no changes were made, SaveChangesAsync returns 0. 
        var result = await context.SaveChangesAsync() > 0;
        // return the basket to the client
        // if the basket was newly created, return a 201 status code
        if (result) return CreatedAtAction(nameof(GetBasket), basket.ToDto());
        return BadRequest("Problem saving item to basket");
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        // get the basket
        var basket = await RetrieveBasket();
        // remove the item or reduce quantity
        if (basket == null) return BadRequest("Basket not found");
        // use the RemoveItem method in the Basket entity to remove the item or reduce its quantity
        basket.RemoveItem(productId, quantity);
        // save the changes to the basket
        var result = await context.SaveChangesAsync() > 0;
        if (result) return Ok();
        return BadRequest("Problem removing item from basket");
    }


    private async Task<Basket?> RetrieveBasket()
    {
        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == Request.Cookies["basketId"]);
    }

    private Basket CreateBasket()
    {
        // create a new basket with a unique ID as a string
        // this ID will be stored in a cookie in the browser
        var basketId = Guid.NewGuid().ToString();
        var cookieOptions = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTime.UtcNow.AddDays(30),
        };
        // set the cookie in the response
        // this will allow the user to return to the basket later
        Response.Cookies.Append("basketId", basketId, cookieOptions);
        var basket = new Basket { BasketId = basketId };
        // tell Entity Framework to track the new basket entity in memory
        // so that it can be saved to the database later
        context.Baskets.Add(basket);
        return basket;
    }
}
