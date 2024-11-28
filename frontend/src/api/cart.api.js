import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
    reducerPath:'cartApi',
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders: (headers)=>{
            const token = localStorage.getItem('_at') || null

            if(!token) {
                headers.set("Authorization", "Bearer "+token)
            }
        }
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
        })
    })
})
export const {useListAllCartQuery, useCreateCartMutation, useDeleteCartMutation} = cartApi