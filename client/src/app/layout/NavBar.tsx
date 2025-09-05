import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { setDarkMode } from "./uiSlice";
import { useFetchBasketQuery } from "../../features/basket/basketApi";

const midLinks = [
  { title: 'catalog', path: '/catalog' },
  { title: 'about', path: '/about' },
  { title: 'contact', path: '/contacts' }
]

const rightLinks = [
  { title: 'login', path: '/login' },
  { title: 'register', path: '/register' },
]

const navStyles = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': {
    color: 'grey.500'
  },
  '&.active': {
    color: '#baecf9'
  }
}


export default function NavBar() {
  // get the loading state from the Redux store
  const { isLoading, darkMode } = useAppSelector(state => state.ui);
  // use the custom dispatch hook to dispatch actions
  const dispatch = useAppDispatch()
  // Fetch the basket data using the RTK Query hook, 
  // but it will take from the cache if already fetched
  // set alias 'data' to 'basket' for clarity
  const { data: basket } = useFetchBasketQuery();

  // Calculate the total item count in the basket or default to 0 if basket is undefined
  const itemCount = basket?.items.reduce((sum, item) => sum + item.quantity, 0) || 0

  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography component={NavLink} sx={navStyles} to={'/'} variant='h6'>RE-STORE</Typography>
          <IconButton onClick={() => dispatch(setDarkMode())}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
          </IconButton>
        </Box>

        <List sx={{ display: 'flex' }}>
          {midLinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton component={Link} to='/basket' size="large" sx={{ color: 'inherit' }}>
            <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {rightLinks.map(({ title, path }) => (
              <ListItem
                component={NavLink}
                to={path}
                key={path}
                sx={navStyles}
              >
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>

      </Toolbar>
      {/* Set a progress bar when the app is in a loading state */}
      {isLoading && (
        <Box sx={{ width: "100%" }}>
          <LinearProgress color="secondary" />
        </Box>
      )}
    </AppBar>
  )
}