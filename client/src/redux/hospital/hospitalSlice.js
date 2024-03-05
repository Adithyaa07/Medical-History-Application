import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentHospital: null,
  error: null,
  loading: false,
};

const hospitalSlice = createSlice({
  name: "hospital",
  initialState,
  reducers: {
    signInStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    signInSuccess: (state, action) => {
      state.currentHospital = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { signInStart, signInSuccess, signInFailure } =
  hospitalSlice.actions;

  export default hospitalSlice.reducer;