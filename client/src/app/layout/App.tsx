import NavBar from "./NavBar"
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material"
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../store/store";

function App() {
  // Get the dark mode state from the Redux store
  const { darkMode } = useAppSelector(state => state.ui);

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


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      <Box sx={{
        minHeight: '100vh',
        background: darkMode
          ? 'radial-gradient(circle, #1e3aBa, #111B27)'
          : 'radial-gradient(circle, #baecf9, #f0f9ff)',
        py: 6
      }}>
        <Container maxWidth="xl" sx={{ mt: 8 }}>
          {/* The Outlet component is a placeholder for the child routes defined in Routes.tsx */}
          {/* This is where the Catalog, HomePage, AboutPage, ContactPage will be rendered */}
          <Outlet />
        </Container>
      </Box>
    </ThemeProvider>
  )
}

export default App
