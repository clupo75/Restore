import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import type { Product } from "../../app/models/product"
import { Link } from "react-router-dom"
import { useAddBasketItemMutation } from "../basket/basketApi"
import { currencyFormat } from "../../lib/util"

type Props = {
    product: Product
}

export default function ProductCard({ product }: Props) {
    // hook to add item to basket using RTK Query
    const [addBasketItem, { isLoading }] = useAddBasketItemMutation();

    return (
        // using the material ui to create the Card component
        <Card
            elevation={3}
            sx={{
                width: 280,
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}
        >
            <CardMedia
                sx={{ height: 240, backgroundSize: 'cover' }}
                image={product.pictureUrl}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom sx={{ textTransform: 'uppercase' }} variant='subtitle2'>
                    {product.name}
                </Typography>
                <Typography variant='h6' sx={{ color: 'secondary.main' }}>
                    {currencyFormat(product.price)}
                </Typography>
            </CardContent>
            {/* Using CardActions for buttons */}
            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Button
                    disabled={isLoading}
                    onClick={() => addBasketItem({ product, quantity: 1 })}
                >Add To Cart</Button>
                <Button component={Link} to={`/catalog/${product.id}`}>View</Button>
            </CardActions>
        </Card>
    )
}

