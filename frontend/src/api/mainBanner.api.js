import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const MainBannerApi = createApi({
    reducerPath: "MainBannerApi",
    baseQuery: fetchBaseQuery({
        baseUrl: import.meta.env.VITE_API_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('_at') || null;
            if (token) {
                headers.set("Authorization", "Bearer " + token);
            }
            return headers;
        }
    }),
    tagTypes: ['mainBanner'],
    // Keep unused data for 10 minutes for better performance (banners change infrequently)
    keepUnusedDataFor: 600,
    // Refetch on reconnect for better UX
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        listAll: builder.query({
            query: () => `/banner_1`,
            providesTags: ['mainBanner'],
            // Keep banner list data for 5 minutes
            keepUnusedDataFor: 300,
        }),        
        listForHome: builder.query({
            query: () => '/banner_1/list',
            // Cache home banner for 20 minutes since it's critical and changes infrequently
            keepUnusedDataFor: 1200,
            // Provide more specific tags for better cache management
            providesTags: (result) => 
                result?.result?.data
                    ? [
                        ...result.result.data.map(({ _id }) => ({ type: 'mainBanner', id: _id })),
                        { type: 'mainBanner', id: 'HOME_BANNER' },
                    ]
                    : [{ type: 'mainBanner', id: 'HOME_BANNER' }],
        }),
        update: builder.mutation({
            query: ({ id, payload }) => ({
                url: `/banner_1/${id}`,
                body: payload,
                method: 'PUT',
                headers: () => ([
                    { "Content-Type": "multipart/form-data" }
                ])
            }),
            invalidatesTags: ['mainBanner'],
            // Optimistically update the cache
            async onQueryStarted({ id, payload }, { dispatch, queryFulfilled }) {
                try {
                    await queryFulfilled;
                    // Invalidate specific banner cache
                    dispatch(
                        MainBannerApi.util.invalidateTags([
                            { type: 'mainBanner', id },
                            { type: 'mainBanner', id: 'HOME_BANNER' }
                        ])
                    );
                } catch {
                    // Handle error if needed
                }
            },
        }),
        showById: builder.query({
            query: (id) => `/banner_1/${id}`,
            // Keep individual banner data for 15 minutes
            keepUnusedDataFor: 900,
            // Provide specific tags for better cache invalidation
            providesTags: (result, error, id) => [{ type: 'mainBanner', id }],
        }),
    })
});

export const {
    useShowByIdQuery, 
    useUpdateMutation, 
    useListForHomeQuery, 
    useListAllQuery
} = MainBannerApi;