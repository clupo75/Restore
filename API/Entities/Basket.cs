using System;

namespace API.Entities;

public class Basket
{
    public int Id { get; set; }

    // store this value as a cookie in the browser
    // so that the user can return to the basket later
    public required string BasketId { get; set; }

    // collection navigation property to the BasketItem entity
    // 1 to many relationship between Basket and BasketItem
    public List<BasketItem> Items { get; set; } = [];


    // these methods don't affect the database directly
    // they're telling entity framework to track the current state of the Basket entity
    // In order to use these methods, we need to retrieve the Basket entity from the database
    // then call these methods on the retrieved entity.
    public void AddItem(Product product, int quantity)
    {
        if (product == null) ArgumentNullException.ThrowIfNull(product);
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero.",
            nameof(quantity));

        var existingItem = FindItem(product.Id);

        if (existingItem == null)
        {
            Items.Add(new BasketItem
            {
                Product = product,
                Quantity = quantity,
            });
        }
        else
        {
            existingItem.Quantity += quantity;
        }
    }

    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <= 0) throw new ArgumentException("Quantity must be greater than zero.",
            nameof(quantity));

        var item = FindItem(productId);
        if (item == null) return;
        // decrease the quantity of the item in the basket
        item.Quantity -= quantity;
        // if the quantity is less than or equal to zero, remove the item from the basket
        if (item.Quantity <= 0)
        {
            Items.Remove(item);
        }
    }

    private BasketItem? FindItem(int productId)
    {
        return Items.FirstOrDefault(item => item.ProductId == productId);
    }

}
