import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const ProductApi = createApi({
    reducerPath: "productApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('_at') || null
            if(token){
                headers.set("Authorization", "Bearer "+token)
            }
        }
    }),
    tagTypes:['Product'],
    endpoints:(builder)=>({
        listAll: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) => 
              `/product?page=${page}&limit=${limit}&search=${search}`,
            providesTags:['Product'],
          }),
        createProduct:builder.mutation({
            query:(args)=> ({
                url: "/product",
                body:args,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            }),
            invalidatesTags:['Product']
        }),
        listForHome:builder.query({
            query:({search = '' }) =>`/product/list?search=${search}`
        }),
        listById:builder.query({
            query:(id)=> `/product/${id}`
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/product/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:['Product']
        }),
        editProduct:builder.mutation({
            query:({id,payload})=>({
                url: `/product/${id}`,
                method:'PUT',
                body:payload,
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            }),
            invalidatesTags:['Product']
        }),
    })

}) 
export const {useListAllQuery, useListForHomeQuery,useCreateProductMutation, useListByIdQuery, useDeleteProductMutation, useEditProductMutation} = ProductApi