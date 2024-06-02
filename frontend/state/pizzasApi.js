import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzasApi = createApi({
    reduerPath: 'pizzasApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/'}),
    tagTypes: ['Orders'],
    endpoints: builder => ({
        getOrders: builder.query({
            query: () => 'history',
            providesTags: ['Orders']
        }),

    })
})

export const {
    useGetOrdersQuery
} = pizzasApi