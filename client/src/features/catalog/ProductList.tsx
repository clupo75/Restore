import { Box } from "@mui/material"
import type { Product } from "../../app/models/product"
import ProductCard from "./ProductCard"

type Props = {
    products: Product[]
}

export default function ProductList({ products }: Props) {
    return (
        // Box is similar to div in material UI
        <Box sx={{display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center'}}>
            {/* map over each product item and implicitly return the value in a list
                using parentheses. Otherwise use the return for blocks of code in curly braces */}
            {products.map(product => (
                <ProductCard key={product.id} product={product}/>
            ))}
        </Box>
    )
}