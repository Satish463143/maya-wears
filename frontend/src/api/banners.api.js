import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const BannersApi = createApi({
    reducerPath:"BannersApi",
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
            query:({ page = 1, limit = 10, search = '' }) => `/banner?page=${page}&limit=${limit}&search=${search}`
        }),
        create:builder.mutation({
            query:(formData)=> ({
                url: "/banner",
                body:formData,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        listForHome: builder.query({
            query: () => '/banner/list', // No query parameters needed
          }),
        update:builder.mutation({
            query:({id,payload})=>({
                url: `/banner/${id}`,
                body:payload,
                method:'PUT',
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            })
        }),
        showById:builder.query({
            query:(id)=>`/banner/${id}`
        }),
        delete:builder.mutation({
            query:(id)=>({
                url:`/banner/${id}`,
                method:"DELETE"
            })
        }),
    })
})
export const {useShowByIdQuery, useDeleteMutation, useUpdateMutation, useListForHomeQuery, useCreateMutation, useListAllQuery} = BannersApi