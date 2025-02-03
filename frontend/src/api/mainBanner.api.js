import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MainBannerApi = createApi({
    reducerPath:"MainBannerApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('_at') || null
            if(token){
                headers.set("Authorization", "Bearer "+token)
            }
        }
    }),
    tagTypes:['mainBanner'],
    endpoints:(builder)=>({
        listAll:builder.query({
            query:() => `/banner_1`,
            providesTags:['mainBanner'],
        }),        
        listForHome: builder.query({
            query: () => '/banner_1/list', 
          }),
        update:builder.mutation({
            query:({id,payload})=>({
                url: `/banner_1/${id}`,
                body:payload,
                method:'PUT',
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            }),
            invalidatesTags:['mainBanner'],
        }),
        showById:builder.query({
            query:(id)=>`/banner_1/${id}`
        }),
        
    })
})
export const {useShowByIdQuery, useUpdateMutation, useListForHomeQuery, useListAllQuery} = MainBannerApi