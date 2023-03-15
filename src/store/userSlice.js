import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    loaduser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    signout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.loading = false;
    },
    setLoading: (state, action) => {
      state.loading = true;
    },
    errors: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setloadingfalse: (state) => {
      state.loading = false;
    }

  },
});

export const { loaduser, logout, setLoading, errors,setloadingfalse ,signout} = userSlice.actions;

export default userSlice.reducer;
