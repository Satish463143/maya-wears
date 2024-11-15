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
        listAll:builder.query({
            query:() => "/collection"
        }),
        // createCollection:builder.mutation({
        //     query:(args)=> ({
        //         url: "/collection",
        //         body:args,
        //         method:"",
        //         headers:()=>([
        //             {"Content-Type":"multipart/form-data"}
        //         ])
        //     })
        // }),
        listForHome:builder.query({
            query:() => "/collection/list"
        }),

    })

}) 
export const {useListAllQuery, useListForHomeQuery,useCreateCollectionMutation} = CollectionApi