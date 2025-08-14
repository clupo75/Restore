import { SearchOff } from "@mui/icons-material";
import { Button, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <Paper
            sx={{
                height: 400,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                p: 6
            }}
        >
            <SearchOff sx={{ fontSize: 100 }} color="primary" />
            <Typography variant="h3" gutterBottom>
                Oops - we could not find what you were looking for!
            </Typography>
            {/* Use the Link to navigate back to the catalog page */}
            <Button fullWidth component={Link} to="/catalog">
                Go Back To The Shop
            </Button>
        </Paper>
    )
}