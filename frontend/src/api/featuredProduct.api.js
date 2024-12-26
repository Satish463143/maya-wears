import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FeaturedProductApi = createApi({
    reducerPath:"FeaturedProductApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('_at') || null
            if(token){
                headers.set("Authorization", "Bearer "+token)
            }
        }
    }),
    endpoints:(builder)=>({
        listAll:builder.query({
            query:() => "/featured_product"
        }),
        create:builder.mutation({
            query:(args)=> ({
                url: "/featured_product",
                body:args,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        listForHome:builder.query({
            query:()=> '/featured_product/list'
        }),
        update:builder.mutation({
            query:(id)=>({
                url: `/featured_product/${id}`,
                method:'PUT',
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            })
        }),
        showById:builder.query({
            query:(id)=>`/featured_product/${id}`
        }),
        delete:builder.mutation({
            query:(id)=>({
                url:`/featured_product/${id}`,
                method:"DELETE"
            })
        }),
    })
})
export const {useShowByIdQuery, useDeleteMutation, useUpdateMutation, useListForHomeQuery, useCreateMutation, useListAllQuery} = FeaturedProductApi