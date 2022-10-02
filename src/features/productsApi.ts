import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IlBhcmFnVGhhcmFuaTI0QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9wYXJhZy10aGFyYW5pIiwiaWF0IjoxNjY0NTEyMDQ0LCJleHAiOjE2NjQ5NDQwNDR9.m-z1LzWlUsJuB9N5lggPj1qAnypyhxfQc8MOdvUnrvk";

export const allProducts = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
      baseUrl: 'https://upayments-studycase-api.herokuapp.com/api',
      prepareHeaders(headers) {
        headers.set('Authorization', `Bearer ${authToken}`);
  
        return headers;
      },
    }),
    endpoints:(builder) => ({
        getAllProducts: builder.query({
          query:() =>({
            url: `products`,
            method: "GET"
          })
        }),
        getAllCategories: builder.query({
            query:() => ({
                url: `categories`,
                method: "GET"
            })
        })
      })
})

export const { useGetAllProductsQuery , useGetAllCategoriesQuery } = allProducts