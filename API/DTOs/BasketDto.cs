namespace API.DTOs;

// Data Transfer Object (DTO) for Basket entity
// This DTO is used to transfer basket data between the API and the client.
// The entity framework will not use this DTO directly, 
// but it is used to shape the data from the entity returned by the API due to problems with the json serializer.
public class BasketDto
{
    public required string BasketId { get; set; }

    public List<BasketItemDto> Items { get; set; } = [];
}
