import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
          const token = localStorage.getItem('_at') || null; // Check for token    
          if (token) {
            headers.set("Authorization", "Bearer " + token); // If logged in, add token to headers
          }    
          return headers;
        },
      }),
      tagTypes: ['Cart'],
    endpoints:(builder)=>({
        listAllCart : builder.query({
            query:(cartId)=> `/cart/${cartId}`,
            method:"GET",
            providesTags: ['Cart'],
        }),
        createCart :builder.mutation({
            query:(args)=>({
                url:'/cart',
                body:args,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            }),
            invalidatesTags: ['Cart'],
        }),
        deleteCart:builder.mutation({
            query:(id)=>({
                url:`/cart/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['Cart'],
        }),
        updateCart:builder.mutation({
            query:({productId, quantity })=>({
                url:`/cart/${productId}`,
                method:"PUT",
                body:{quantity}
            }),
            invalidatesTags: ['Cart'],
        }),
        deledeEntireCart:builder.mutation({
            query:(id)=>({
                url:`/cart/cartId/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['Cart'],
        })
    })
})
export const {useListAllCartQuery, useCreateCartMutation, useDeleteCartMutation, useUpdateCartMutation, useDeledeEntireCartMutation} = cartApi