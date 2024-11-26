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
    endpoints:(builder)=>({
        listAll: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) => 
              `/product?page=${page}&limit=${limit}&search=${search}`,
          }),
        // createProduct:builder.mutation({
        //     query:(args)=> ({
        //         url: "/product",
        //         body:args,
        //         method:"",
        //         headers:()=>([
        //             {"Content-Type":"multipart/form-data"}
        //         ])
        //     })
        // }),
        listForHome:builder.query({
            query:() => "/product/list"
        }),
        listById:builder.query({
            query:()=> `/product/${id}`
        }),
        deleteProduct:builder.mutation({
            query:(id)=>({
                url:`/product/${id}`,
                method:"DELETE"
            })
        }),
        editProduct:builder.mutation({
            query:(id)=>({
                url: `/product/${id}`,
                method:'PUT',
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            })
        })

    })

}) 
export const {useListAllQuery, useListForHomeQuery,useCreateProductMutation, useListByIdQuery, useDeleteProductMutation} = ProductApi