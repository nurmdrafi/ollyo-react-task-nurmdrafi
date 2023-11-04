import { configureStore, Store } from "@reduxjs/toolkit"
import { useDispatch, useSelector } from "react-redux"
import type { TypedUseSelectorHook } from "react-redux"

// Import Reducers
import imageReducer from "./Reducers/imageReducer"

const store: Store = configureStore({
  reducer: {
    image: imageReducer
  }
})

// Define types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => (AppDispatch) = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
