import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pizzasApi = createApi({
    reduerPath: 'pizzasApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:9009/api/pizza/'}),
    tagTypes: ['Pizzas'],
    endpoints: builder => ({
        getPizzas: builder.query({
            query: () => 'history',
            providesTags: ['Pizzas']
        }),

    })
})

export const {
    useGetPizzasQuery
} = pizzasApi