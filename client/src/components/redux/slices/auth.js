import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../axios/axios";
export const selectIsAuth = (state) => Boolean(state.auth.data);

export const fetchMe = createAsyncThunk("auth/fetchMe", async () => {
  const { data } = await axios.get("/auth/me");
  return data;
});

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (params) => {
    const { data } = await axios.post("/auth/signin", params);
    return data;
  }
);
export const fetchSignUp = createAsyncThunk(
  "auth/fetchSignUp",
  async (params) => {
    const { data } = await axios.post("/auth/signup", params);
    return data;
  }
);

const initialState = {
  data: null,
  status: "loading",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.data = null;
    },
  },
  extraReducers: {
    [fetchUserData.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchUserData.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },

    [fetchUserData.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchSignUp.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchSignUp.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },

    [fetchSignUp.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
    [fetchMe.pending]: (state) => {
      state.status = "loading";
      state.data = null;
    },
    [fetchMe.fulfilled]: (state, action) => {
      state.data = action.payload;
      state.status = "loaded";
    },
    [fetchMe.rejected]: (state) => {
      state.data = null;
      state.status = "error";
    },
  },
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
