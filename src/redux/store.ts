import { configureStore } from "@reduxjs/toolkit";
import minionsReducer from "./minionsSlice";


export const store = configureStore({
  reducer: { minions: minionsReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
