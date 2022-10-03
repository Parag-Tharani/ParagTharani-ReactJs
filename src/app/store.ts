import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { allProducts } from "../features/productsApi";
import favReducer from "../features/favourite"
import delReducer from "../features/deleteProduct"

export const store = configureStore({
    reducer: {
        fav: favReducer,
        del: delReducer,
        [allProducts.reducerPath]: allProducts.reducer,
      },
      middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat(allProducts.middleware);
      },
})

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;