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
    tagTypes: ['Collection'],
    endpoints:(builder)=>({
        listAll: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) => 
              `/collection?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ['Collection'],
          }),
        createCollection:builder.mutation({
            query:(formData)=> ({
                url: "/collection",
                body:formData,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            }),
            invalidatesTags: ['Collection'],
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
            }),
            invalidatesTags: ['Collection'],
        }),
        deleteCollection:builder.mutation({
            query:(id)=>({
                url:`/collection/${id}`,
                method:"DELETE"
            }),
            invalidatesTags: ['Collection'],
        }),
        listForHome:builder.query({
            query:() => "/collection/list"
        }),
        listProductFromCollection:builder.query({
            query:(collectionId)=>`/collection/fetchById/${collectionId}`
        })
    })
}) 
export const {useListAllQuery, useListForHomeQuery,useCreateCollectionMutation, useDeleteCollectionMutation, useUpdateCollectionMutation, useShowByIdQuery,useListProductFromCollectionQuery} = CollectionApi