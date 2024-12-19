import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const orderApi = createApi({
    reducerPath:'orderApi',
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
      endpoints:(builder)=>({
        listOrderForAdmin:builder.query({
            query:({ page = 1, limit = 10, search = '' })=> `/order?page=${page}&limit=${limit}&search=${search}`,
            method:"GET"
        }),
        listOrderForUser:builder.query({
            query:(userId)=> `/order/${userId}`,
            method:'GET'
        }),
        listOrderDetailByIdForAdmin:builder.query({
            query:(id)=> `/order/${id}`,
            method:"GET"
        }),
        createOrder:builder.mutation({
            query:(args)=>({
                url:'/order',
                method:"POST",
                body:args,
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        updateOrderForUser:builder.mutation({
            query:(orderId)=>({
                url:`/order/${orderId}/cancle`,
                method:"PUT",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        updateOrderForAdmin:builder.mutation({
            query:({orderId,payload})=>({
                url:`/order/${orderId}`,
                body:payload,
                method:"PUT",
                headers: {
                    "Content-Type": "application/json", // Use JSON for simplicity
                },
            })
        })
      })

})
export const {useListOrderForAdminQuery, useListOrderForUserQuery, useCreateOrderMutation, useUpdateOrderForAdminMutation, useUpdateOrderForUserMutation, useListOrderDetailByIdForAdminQuery} = orderApi