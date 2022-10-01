import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query"
import { allProducts } from "../features/productsApi";

export const store = configureStore({
    reducer: {
        [allProducts.reducerPath]: allProducts.reducer,
      },
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(allProducts.middleware);
      },
})

setupListeners(store.dispatch)