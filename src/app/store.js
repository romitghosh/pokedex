import { configureStore } from "@reduxjs/toolkit";
import { AppSlice, PokemonSlice } from "./slices";

export const store = configureStore({
  reducer: {
    pokemon: PokemonSlice.reducer,
    app: AppSlice.reducer,
  },
});

export const AppDispatch = store.dispatch;
export const RootState = store.getState;
