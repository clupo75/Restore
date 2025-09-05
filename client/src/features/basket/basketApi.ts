import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithErrorHandling } from "../../app/api/baseApi";
import { Item, type Basket } from "../../app/models/basket";
import type { Product } from "../../app/models/product";

// create a type guard to check if the object is of type Product or Item
function isBasketItem(product: Product | Item): product is Item {
  // check if the product has a quantity property
  return (product as Item).quantity !== undefined;
}

// use RTK Query to manage basket API calls
export const basketApi = createApi({
  reducerPath: "basketApi",
  baseQuery: baseQueryWithErrorHandling,
  tagTypes: ["Basket"],
  endpoints: (builder) => ({
    // using query to fetch the basket as it is a GET request
    fetchBasket: builder.query<Basket, void>({
      query: () => "basket",
      providesTags: ["Basket"],
    }),
    // using mutation to add/remove an item to the basket
    // as it modifies the state on the server
    addBasketItem: builder.mutation<
      Basket,
      { product: Product | Item; quantity: number }
    >({
      query: ({ product, quantity }) => {
        // if the product is of type Item, extract the productId from it
        const productId = isBasketItem(product)
          ? product.productId
          : product.id;
        return {
          url: `basket?productId=${productId}&quantity=${quantity}`,
          method: "POST",
        };
      },
      onQueryStarted: async (
        { product, quantity },
        { dispatch, queryFulfilled }
      ) => {
        // set a flag to check if the basket is new
        let isNewBasket = false;
        // update the state before the API call is completed
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const productId = isBasketItem(product)
              ? product.productId
              : product.id;

            // check if the basket is new by checking if the basketId is null or undefined
            if (!draft?.basketId) isNewBasket = true;

            // if the basket is not new, check if the item already exists in the basket
            // if it exists, update the quantity, otherwise add the new item to the basket
            if (!isNewBasket) {
              const existingItem = draft.items.find(
                (item) => item.productId === productId
              );
              if (existingItem) existingItem.quantity += quantity;
              else
                draft.items.push(
                  isBasketItem(product)
                    ? product
                    : { ...product, productId: product.id, quantity: quantity }
                );
            }
          })
        );

        try {
          // wait for the query to be fulfilled
          await queryFulfilled;
          // if the basket is new, invalidate the basket tag in the cache to refetch the basket
          if (isNewBasket) {
            dispatch(basketApi.util.invalidateTags(["Basket"]));
          }
        } catch (error) {
          console.log(error);
          // if the query fails, undo the optimistic update
          patchResult.undo();
        }
      },
    }),
    removeBasketItem: builder.mutation<
      void,
      { productId: number; quantity: number }
    >({
      query: ({ productId, quantity }) => ({
        url: `basket?productId=${productId}&quantity=${quantity}`,
        method: "DELETE",
      }),
      onQueryStarted: async (
        { productId, quantity },
        { dispatch, queryFulfilled }
      ) => {
        // update the state before the API call is completed
        const patchResult = dispatch(
          basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
            const itemIndex = draft.items.findIndex(
              (item) => item.productId === productId
            );
            if (itemIndex >= 0) {
              draft.items[itemIndex].quantity -= quantity;
              if (draft.items[itemIndex].quantity <= 0) {
                draft.items.splice(itemIndex, 1);
              }
            }
          })
        );

        try {
          await queryFulfilled;
        } catch (error) {
          console.log(error);
          patchResult.undo();
        }
      },
    }),
  }),
});

export const {
  useFetchBasketQuery,
  useAddBasketItemMutation,
  useRemoveBasketItemMutation,
} = basketApi;
