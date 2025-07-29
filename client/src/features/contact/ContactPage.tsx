import { decrement, increment } from "./counterReducer"
import { Button, ButtonGroup, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/store";

export default function ContactPage() {
  const { count } = useAppSelector(state => state.counter);
  // useAppDispatch is a hook that returns the dispatch function from the Redux store
  // This allows you to dispatch actions to the store
  const dispatch = useAppDispatch();

  return (
    <>
      <Typography variant="h2">
        Contact Page
      </Typography>
      <Typography variant="body1">
        The current count is: {count}
      </Typography>
      <ButtonGroup>
        {/* Dispatch actions to increment or decrement the count */}
        <Button onClick={() => dispatch(decrement(1))} color="error">Decrement</Button>
        <Button onClick={() => dispatch(increment(1))} color="success">Increment</Button>
        <Button onClick={() => dispatch(increment(10))} color="primary">Increment by 10</Button>
      </ButtonGroup>
    </>

  )
}
