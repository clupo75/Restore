import { useEffect, useState } from "react"
import type { Product } from "../models/product"
import Catalog from "../../features/catalog/Catalog"
import NavBar from "./NavBar"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(false);

  const paletteType = darkMode ? 'dark' : 'light'
  // set dark or light mode
  const theme = createTheme({
    palette: {
      mode: paletteType,
      background: {
        default: (paletteType === 'light') ? '#eaeaea' : '#121212'
      }
    }
  })

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  // when the dependencies change the use effect runs
  // otherwise it runs only once when the component mounts
  // calls the products api and sets the initial products object
  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then(response => response.json())
      .then(data => setProducts(data))
  }, [])


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode}></NavBar>
      <Box sx={{
        minHeight: '100vh',
        background: darkMode 
          ? 'radial-gradient(circle, #1e3aBa, #111B27)' 
          : 'radial-gradient(circle, #baecf9, #f0f9ff)' ,
        py: 6
      }}>
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          <Catalog products={products} />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
