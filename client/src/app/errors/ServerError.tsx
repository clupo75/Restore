import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

export default function ServerError() {
    // Use useLocation to access the state passed from the router
    // This is useful for displaying the error details passed from the baseApi
    const { state } = useLocation();

    return (
        <Paper>
            {state.error ? (
                <>
                    <Typography gutterBottom variant="h3" sx={{ px: 4, pt: 2 }} color="seondary">
                        {state.error.title}
                    </Typography>
                    <Divider />
                    <Typography variant="body1" sx={{ p: 4 }}>{state.error.detail}</Typography>
                </>
            ) : (
                <Typography variant="h5" gutterBottom>Server Error</Typography>
            )}
        </Paper>
    )
}