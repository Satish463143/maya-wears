import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query/react"

export const CustomerGalleryApi = createApi({
    reducerPath: "customerGalleryApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('_at') || null
            if(token){
                headers.set("Authorization", "Bearer "+token)
            }
        }
    }),
    tagTypes:['CustomerGallery'],
    endpoints:(builder)=>({
        create:builder.mutation({
            query:(args)=>({
                url:'/customer_gallery',
                method:"POST",
                body:args,
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            }),
            invalidatesTags:['CustomerGallery'],
        }),
        listAllGallery:builder.query({
            query:({ page = 1, limit = 20,})=>`/customer_gallery?page=${page}&limit=${limit}`,
            method:'GET',
            providesTags:['CustomerGallery'],
        }),
        deleteGallery:builder.mutation({
            query:({ imageUrl})=>({
                url:`/customer_gallery/delete-by-url/${encodeURIComponent(imageUrl)}`,
                method:"DELETE",
            }),
            invalidatesTags:['CustomerGallery'],
        })       

    })

})

export const  {useCreateMutation, useListAllGalleryQuery, useDeleteGalleryMutation} =  CustomerGalleryApi