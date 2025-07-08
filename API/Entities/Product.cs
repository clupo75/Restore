namespace API.Entities;

public class Product
{
    // Id becomes the primary key for the db table
    public int Id { get; set; }
    // use the 'required' modifier for optional string types to enforce their setting
    public required string Name { get; set; }
    public required string Description { get; set; }
    public long Price { get; set; }
    public required string PictureUrl { get; set; }
    public required string Type { get; set; }
    public required string Brand { get; set; }
    public int QuantityInStock { get; set; }
}
