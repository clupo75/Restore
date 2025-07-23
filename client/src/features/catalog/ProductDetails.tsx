import { useParams } from "react-router-dom"
import type { Product } from "../../app/models/product";
import { useEffect, useState } from "react";
import { Button, Divider, Grid2, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";

export default function ProductDetails() {
  // Extracting the product ID from the URL parameters
  // This allows us to fetch the specific product details based on the ID
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    fetch(`https://localhost:5001/api/products/${id}`)
      .then(response => response.json())
      .then(data => setProduct(data))
      .catch(error => console.error('Error fetching product details:', error));
  }, [id])

  const productDetails = [
    {label: 'Name', value: product?.name},
    {label: 'Description', value: product?.description},
    {label: 'Type', value: product?.type},
    {label: 'Brand', value: product?.brand},
    {label: 'Quantity in Stock', value: product?.quantityInStock},
  ]

  if (!product) return <div>Loading...</div>;

  return (
    <Grid2 container spacing={6} maxWidth="lg" sx={{ mx: "auto" }}>
      <Grid2 size={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
      </Grid2>
      <Grid2 size={6}>
        <Typography variant="h3">{product.name}</Typography>
        <Divider sx={{ mb: 2 }} />
        <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table sx={{'& td': { fontSize: '1rem' } }}>
            <TableBody>
              {/* loop through the list of produCtDetails objects and put them in a table row
               and their values in the table cells */}
              {productDetails.map((details, index) => (
                <TableRow key={index}>
                  <TableCell sx={{fontWeight: 'bold'}}>{details.label}</TableCell>
                  <TableCell>{details.value}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Grid2 container spacing={2} marginTop={3}>
          <Grid2 size={6}>
            <TextField
              variant="outlined"
              type="number"
              label="Quantity in Cart"
              fullWidth
              defaultValue={1}
            />
          </Grid2>
          <Grid2 size={6}>
            <Button
              sx={{ height: '55px' }}
              color="primary"
              size="large"
              variant="contained"
              fullWidth
            >
              Add to Cart
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}