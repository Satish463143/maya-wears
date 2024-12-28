import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"
export const CollectionApi = createApi({
    reducerPath: "collectionApi",
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
              `/collection?page=${page}&limit=${limit}&search=${search}`,
          }),
        createCollection:builder.mutation({
            query:(formData)=> ({
                url: "/collection",
                body:formData,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        showById:builder.query({
            query:(id)=>`/collection/${id}`
        }),
        updateCollection:builder.mutation({
            query:({id,payload})=> ({
                url: `/collection/${id}`,
                body:payload,
                method:"PUT",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            })
        }),
        deleteCollection:builder.mutation({
            query:(id)=>({
                url:`/collection/${id}`,
                method:"DELETE"
            })
        }),
        listForHome:builder.query({
            query:() => "/collection/list"
        }),

    })

}) 
export const {useListAllQuery, useListForHomeQuery,useCreateCollectionMutation, useDeleteCollectionMutation, useUpdateCollectionMutation, useShowByIdQuery} = CollectionApi