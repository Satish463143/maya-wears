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
    tagTypes:['FeaturedProduct'],
    endpoints:(builder)=>({
        listAll: builder.query({            
            query: ({ page = 1, limit = 10, search = '' }) => 
              `/featured_product?page=${page}&limit=${limit}&search=${search}`,
            providesTags:['FeaturedProduct'],
          }),
        create:builder.mutation({
            query:(formData)=> ({
                url: "/featured_product",
                body:formData,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            }),
            invalidatesTags:['FeaturedProduct'],
        }),
        listForHome: builder.query({
            query: () => '/featured_product/list', // No query parameters needed
          }),
        update:builder.mutation({
            query:({id,payload})=>({
                url: `/featured_product/${id}`,
                body:payload,
                method:'PUT',
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            }),
            invalidatesTags:['FeaturedProduct'],
        }),
        showById:builder.query({
            query:(id)=>`/featured_product/${id}`
        }),
        delete:builder.mutation({
            query:(id)=>({
                url:`/featured_product/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['FeaturedProduct'],
        }),
    })
})
export const {useShowByIdQuery, useDeleteMutation, useUpdateMutation, useListForHomeQuery, useCreateMutation, useListAllQuery} = FeaturedProductApi