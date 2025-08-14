import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";

// This file defines an API service for handling various error scenarios.
export const errorApi = createApi({
    reducerPath: "errorApi",
    baseQuery: baseQueryWithErrorHandling,
    endpoints: (builder) => ({
        get400Error: builder.query<void, void>({
            query: () => "buggy/bad-request",
        }),
        get401Error: builder.query<void, void>({
            query: () => "buggy/unauthorized",
        }),
        get404Error: builder.query<void, void>({
            query: () => "buggy/not-found",
        }),
        get500Error: builder.query<void, void>({
            query: () => "buggy/server-error",
        }),
        getValidationError: builder.query<void, void>({
            query: () => "buggy/validation-error",
        }),
    })
})

// Export hooks for the defined queries
// useing lazy queries to avoid automatic execution when the component mounts
// This allows the queries to be executed on demand, such as in response to a user action
export const {
    useLazyGet400ErrorQuery,
    useLazyGet401ErrorQuery, 
    useLazyGet404ErrorQuery,
    useLazyGet500ErrorQuery,
    useLazyGetValidationErrorQuery
} = errorApi;