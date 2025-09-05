using API.DTOs;
using API.Entities;
namespace API.Extensions;

public static class BasketExtensions
{
    // Extension method to convert a Basket entity to a BasketDto
    // Use "this" keyword extension method syntax to add the method to the Basket class
    public static BasketDto ToDto(this Basket basket) // basket.ToDto()
    {
        return new BasketDto
        {
            BasketId = basket.BasketId,
            Items = basket.Items.Select(item => new BasketItemDto
            {
                ProductId = item.ProductId,
                Name = item.Product.Name,
                Description = item.Product.Description,
                Price = item.Product.Price,
                PictureUrl = item.Product.PictureUrl,
                Type = item.Product.Type,
                Brand = item.Product.Brand,
                QuantityInStock = item.Product.QuantityInStock,
                Quantity = item.Quantity
            }).ToList()
        };
    }
}
