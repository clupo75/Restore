import {
  fetchBaseQuery,
  type BaseQueryApi,
  type FetchArgs,
} from "@reduxjs/toolkit/query";
import { startLoading, stopLoading } from "../layout/uiSlice";
import { toast } from "react-toastify";
import { router } from "../routes/Routes";

// credentials: 'include' is needed to send cookies with requests
const customBaseQuery = fetchBaseQuery({
  baseUrl: "https://localhost:5001/api",
  credentials: "include",
});

// set the type for the error response
// This can be a string or an object with a title or error array
type ErrorResponse = string | { title: string } | { errors: string[] };

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

export const baseQueryWithErrorHandling = async (
  args: string | FetchArgs,
  api: BaseQueryApi,
  extraOptions: object
) => {
  // Dispatch loading state actions from the UI slice
  api.dispatch(startLoading());
  await sleep(); // Simulate network delay
  const result = await customBaseQuery(args, api, extraOptions);
  // Dispatch loading state actions from the UI slice
  api.dispatch(stopLoading());
  
  if (result.error) {
    console.log(result.error);

    const originalStatus =
      result.error.status === "PARSING_ERROR" && result.error.originalStatus
        ? result.error.originalStatus
        : result.error.status;

    const responseData = result.error.data as ErrorResponse;

    switch (originalStatus) {
      case 400:
        if (typeof responseData === "string") toast.error(responseData);
        else if ("errors" in responseData) {
          // If responseData is an object with errors, join them into a single string
          throw Object.values(responseData.errors).flat().join(", ");
        } else toast.error(responseData.title);
        break;
      case 401:
        if (typeof responseData === "object" && "title" in responseData)
          toast.error(responseData.title);
        break;
      case 404:
        if (typeof responseData === "object" && "title" in responseData)
          router.navigate("/not-found");
        break;
      case 500:
        if (typeof responseData === "object")
          //second parameter is the error object that will be passed to the ServerError component via useLocation hook
          router.navigate("/server-error", {state: { error: responseData } });
        break;
      default:
        break;
    }
  }
  return result;
};
