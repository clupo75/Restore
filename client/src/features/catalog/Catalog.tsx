import type { Product } from "../../app/models/product"
import ProductList from "./ProductList";

// Creating the signature types for the incoming props
type Props = {
  products: Product[];
}

// use prop destructuring for clarity => {products, addProduct}: Props
export default function Catalog({products}: Props) {
  return (
    <>
      <ProductList products={products}/>
    </>
  )
}
