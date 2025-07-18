// create a type for the product returned from the server
export type Product = {
  id: number
  name: string
  description: string
  price: number
  pictureUrl: string
  type: string
  brand: string
  quantityInStock: number
}