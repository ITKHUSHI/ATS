import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  // isAuthenticated: false,
  error: null,
  currentUser: null,
  token:null,
};

const userSlice = createSlice({
  name: 'user',
  initialState, // Correctly using initialState here
  reducers: {
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.token=action.payload;
      state.loading = false;
      state.error = null;
      // isAuthenticated=true;
    },
    signInFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserStart:(state,action)=>{
      state.loading=true;
    },
    deleteUserSuccess:(state, action)=>{
      state.currentUser = action.payload;
      state.token=action.payload;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateProfileStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    updateProfileSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateProfileFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    
  }
});

export const { signInStart, signInSuccess, signInFailed ,deleteUserStart , deleteUserFailed,deleteUserSuccess ,updateProfileStart, updateProfileSuccess, updateProfileFailed } = userSlice.actions;
export default userSlice.reducer;
