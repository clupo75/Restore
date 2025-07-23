import { useEffect, useState } from "react";
import type { Product } from "../../app/models/product"
import ProductList from "./ProductList";

export default function Catalog() {
  const [products, setProducts] = useState<Product[]>([]);

  // when the dependencies change the use effect runs
  // otherwise it runs only once when the component mounts
  // calls the products api and sets the initial products object
  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])

  return (
    <>
      <ProductList products={products} />
    </>
  )
}
