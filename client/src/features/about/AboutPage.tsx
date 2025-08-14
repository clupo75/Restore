import { Alert, AlertTitle, Button, ButtonGroup, Container, List, ListItem, Typography } from "@mui/material";
import {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery,
    useLazyGet404ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGetValidationErrorQuery
} from "./errorApi";
import { useState } from "react";

export default function AboutPage() {
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const [trigger400Error] = useLazyGet400ErrorQuery();
    const [trigger401Error] = useLazyGet401ErrorQuery();
    const [trigger404Error] = useLazyGet404ErrorQuery();
    const [trigger500Error] = useLazyGet500ErrorQuery();
    const [triggerValidationError] = useLazyGetValidationErrorQuery();
    // The useLazyGet...Query hooks return a function that can be called to trigger the query

    const getValidationError = async () => {
        try {
            await triggerValidationError().unwrap();
        } catch (error: unknown) {
            // Handle the error here if needed
            if (error && typeof error === "object" && "message" in error
                    && typeof (error as { message: unknown }).message === "string") {
                const errorArray = (error as { message: string }).message.split(", ");
                setValidationErrors(errorArray);
            }
        }
    }

    return (
        <Container maxWidth="lg">
            <Typography gutterBottom variant="h3">Errors For Testing</Typography>
            <ButtonGroup fullWidth>
                <Button variant="contained" onClick={() => trigger400Error().catch(err => console.log(err))}>400 Error</Button>
                <Button variant="contained" onClick={() => trigger401Error().catch(err => console.log(err))}>401 Error</Button>
                <Button variant="contained" onClick={() => trigger404Error().catch(err => console.log(err))}>404 Error</Button>
                <Button variant="contained" onClick={() => trigger500Error().catch(err => console.log(err))}>500 Error</Button>
                <Button variant="contained" onClick={getValidationError}>Validation Error</Button>
            </ButtonGroup>
            {validationErrors.length > 0 && (
                <Alert severity="error">
                    <AlertTitle>Validation Errors</AlertTitle>
                    <List>
                        {validationErrors.map(error => (
                            <ListItem key={error}>
                                {error}
                            </ListItem>
                        ))}
                    </List>
                </Alert>
            )}
        </Container>
    )
}