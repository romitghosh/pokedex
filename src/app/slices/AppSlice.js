import { createSlice } from "@reduxjs/toolkit";
import { pokemonTabs } from "../../utils/constants";

const initialState = {
  isLoading: true,
  userInfo: undefined,
  toasts: [],
  currentPokemonTab: pokemonTabs.description,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUserStatus: (state, action) => {
      state.userInfo = action.payload;
    },
    setToast: (state, action) => {
      const toasts = [...state.toasts];
      toasts.push(action.payload);
      state.toasts = toasts;
    },
    clearToasts: (state) => {
      state.toasts = [];
    },
    setPokemonTab: (state, action) => {
      state.currentPokemonTab = action.payload;
    },
  },
});

export const {
  setLoading,
  setUserStatus,
  setToast,
  clearToasts,
  setPokemonTab,
} = AppSlice.actions;
