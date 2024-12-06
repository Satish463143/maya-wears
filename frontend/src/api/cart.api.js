import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
          const token = localStorage.getItem('_at') || null; // Check for token
          const cartId = localStorage.getItem('cartId'); // Check for cartId for anonymous users
    
          if (token) {
            headers.set("Authorization", "Bearer " + token); // If logged in, add token to headers
          }
    
          if (cartId) {
            headers.set("Cart-Id", cartId); // If anonymous, add cartId to headers
          }
    
          return headers;
        },
      }),
    endpoints:(builder)=>({
        listAllCart : builder.query({
            query:()=> "/cart"
        }),
        createCart :builder.mutation({
            query:(args)=>({
                url:'/cart',
                body:args,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),

        deleteCart:builder.mutation({
            query:(id)=>({
                url:`/cart/${id}`,
                method:"DELETE"
            })
        }),
        updateCart:builder.mutation({
            query:({productId, size, quantity })=>({
                url:`/cart/${productId}`,
                method:"PUT",
                body:{size, quantity}
            })
        })
    })
})
export const {useListAllCartQuery, useCreateCartMutation, useDeleteCartMutation, useUpdateCartMutation} = cartApi