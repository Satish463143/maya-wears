import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PromoApi = createApi({
    reducerPath:"PromoApi",
    baseQuery: fetchBaseQuery({
        baseUrl:import.meta.env.VITE_API_URL,
        prepareHeaders:(headers)=>{
            const token = localStorage.getItem('_at') || null
            if(token){
                headers.set("Authorization", "Bearer "+token)
            }
        }
    }),
    tagTypes:['Promos'],
    endpoints:(builder)=>({
        listAll:builder.query({
            query:({ page = 1, limit = 10, search = '' }) => `/promo?page=${page}&limit=${limit}&search=${search}`,
            providesTags:['Promos'],
        }),
        create:builder.mutation({
            query:(formData)=> ({
                url: "/promo",
                body:formData,
                method:"POST",
                headers:()=>([
                    {"Content-Type":"multipart/form-data"}
                ])
            }),
            invalidatesTags:['Promos'],
        }),
        update:builder.mutation({
            query:({id,payload})=>({
                url: `/promo/${id}`,
                body:payload,
                method:'PUT',
                headers:()=>([
                    {"Content-Type" :"multipart/form-data"}
                ])
            }),
            invalidatesTags:['Promos'],
        }),
        showById:builder.query({
            query:(id)=>`/promo/${id}`
        }),
        applyPromo:builder.mutation({
            query: ({payload})=>({
                url:`/promo/applyPromo`,
                body:payload,
                method:'POST',
                headers: { "Content-Type": "application/json" } 
            })
            
        }),
        delete:builder.mutation({
            query:(id)=>({
                url:`/promo/${id}`,
                method:"DELETE"
            }),
             invalidatesTags:['Promos'],
        }),
    })
})
export const {useShowByIdQuery, useDeleteMutation, useUpdateMutation,  useCreateMutation, useListAllQuery, useApplyPromoMutation} = PromoApi