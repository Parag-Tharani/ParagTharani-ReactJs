import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBhcmFndGhhcmFuaTI0QGdtYWlsLmNvbSIsImdpdGh1YiI6Imh0dHBzOi8vZ2l0aHViLmNvbS9wYXJhZy10aGFyYW5pIiwiaWF0IjoxNjY0OTUyNzAyLCJleHAiOjE2NjUzODQ3MDJ9.14mm6QQly8XpLGmCpxTZQ2-djKM3gUCujuVoI9MzbN0";

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
        }),
        getProductDetails : builder.query({
            query:(id) => ({
                url: `products/${id}`,
                method: "GET"
            })
        }),
        createProduct : builder.mutation({
          query:(body) => ({
            url:`products`,
            method:"POST",
            body,
            headers:{
              "Content-Type":"application/json"
            }
          })
        })
      })
})

export const { useGetAllProductsQuery , useGetAllCategoriesQuery, useGetProductDetailsQuery, useCreateProductMutation } = allProducts