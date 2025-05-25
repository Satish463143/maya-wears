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
            return headers;
        }
    }),
    tagTypes: ['Collection'],
    // Keep unused data for 5 minutes for better performance
    keepUnusedDataFor: 300,
    // Refetch on reconnect for better UX
    refetchOnReconnect: true,
    endpoints:(builder)=>({
        listAll: builder.query({
            query: ({ page = 1, limit = 10, search = '' }) => 
              `/collection?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ['Collection'],
            // Keep data for 2 minutes
            keepUnusedDataFor: 120,
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
            query:(id)=>`/collection/${id}`,
            // Keep individual collection data for 10 minutes
            keepUnusedDataFor: 600,
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
            query:() => "/collection/list",
            // Cache home collections for 15 minutes since they change less frequently
            keepUnusedDataFor: 900,
            // Provide more specific tags for better cache management
            providesTags: (result) => 
                result?.result?.data
                    ? [
                        ...result.result.data.map(({ _id }) => ({ type: 'Collection', id: _id })),
                        { type: 'Collection', id: 'HOME_LIST' },
                    ]
                    : [{ type: 'Collection', id: 'HOME_LIST' }],
        }),
        listProductFromCollection:builder.query({
            query:(collectionId)=>`/collection/fetchById/${collectionId}`,
            // Keep product collection data for 5 minutes
            keepUnusedDataFor: 300,
            // Provide tags for better cache invalidation
            providesTags: (result, error, collectionId) => [
                { type: 'Collection', id: collectionId },
                { type: 'Collection', id: 'PRODUCTS' },
            ],
        })
    })
}) 

export const {
    useListAllQuery, 
    useListForHomeQuery,
    useCreateCollectionMutation, 
    useDeleteCollectionMutation, 
    useUpdateCollectionMutation, 
    useShowByIdQuery,
    useListProductFromCollectionQuery
} = CollectionApi