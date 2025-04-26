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
      tagTypes:['Order'],
      endpoints:(builder)=>({
        listOrderForAdmin:builder.query({
            query:({ page = 1, limit = 10, search = '' }) => {
                // Clean up the search value
                const cleanSearch = search.trim();
                
                // Check if search is numeric
                const isNumeric = !isNaN(cleanSearch) && cleanSearch !== '';
                
                // Adjust the URL based on whether we're searching for a number or text
                if (isNumeric) {
                    // For numeric searches, add a param that signals it's a number
                    return `/order?page=${page}&limit=${limit}&search=${cleanSearch}&type=number`;
                } else {
                    // For text searches, use regular search
                    return `/order?page=${page}&limit=${limit}&search=${encodeURIComponent(cleanSearch)}`;
                }
            },
            method:"GET",
            providesTags:['Order'],
        }),
        listOrderForUser:builder.query({
            query:({ page = 1, limit = 10, search = '' })=> `/order/listForUser?page=${page}&limit=${limit}&search=${search}`,
            method:'GET',
            providesTags:['Order'],
            
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
            }),
            invalidatesTags:['Order']
        }),
        updateOrderForUser:builder.mutation({
            query:(orderId)=>({
                url:`/order/${orderId}/cancel`,
                method:"PUT",
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            invalidatesTags:['Order']
        }),
        updateOrderForAdmin:builder.mutation({
            query:({orderId,payload})=>({
                url:`/order/${orderId}`,
                body:payload,
                method:"PUT",
                headers: {
                    "Content-Type": "application/json", // Use JSON for simplicity
                },
            }),
            invalidatesTags:['Order']
        })
      })

})
export const {useListOrderForAdminQuery, useListOrderForUserQuery, useCreateOrderMutation, useUpdateOrderForAdminMutation, useUpdateOrderForUserMutation, useListOrderDetailByIdForAdminQuery} = orderApi