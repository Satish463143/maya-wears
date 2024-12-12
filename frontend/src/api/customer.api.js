import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const customerApi = createApi({
    reducerPath:'customerApi',
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
        listForAdmin:builder.query({
            query:()=> '/customer',
            method:"GET"
        }),
        createCustomer :builder.mutation({
            query:(args)=>({
                url:'/customer',
                body:args,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        updateCustomer:builder.mutation({
            query:(userId)=>({
                url:`/customer/${userId}`,
                method:"PUT",
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])                
            })
        }),
        listForUser:builder.query({
            query:(userId)=> `/customer/${userId}`,
            method:"GET"
        })
      })

})
export const {useListForAdminQuery, useListForUserQuery, useUpdateCustomerMutation, useCreateCustomerMutation} = customerApi