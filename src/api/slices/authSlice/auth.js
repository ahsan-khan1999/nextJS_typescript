import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import apiServices from "../../../services/requestHandler";
import {
  setRefreshToken,
  setToken,
  saveUser,
  logout,
} from "../../../utils/auth.util";

const initialState = {
  user: null,
  userRole: null,
  loading: false,
  error: null,
  seller: null,
  email: false,
};

export const loginUser = createAsyncThunk(
  "login/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.login(user);
      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      saveUser(response?.data?.data?.user);
      thunkApi.dispatch(setUser(response?.data?.data?.user));
      Cookies.set("kaufestoken", response?.headers?.accesstoken);
      thunkApi.dispatch(setError(null));

      return response?.data?.data?.user;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      // toast.info(e?.data?.message);
      return false;
    }
  }
);
export const resetPassword = createAsyncThunk(
  "reset/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.resetPassword(user);
      thunkApi.dispatch(setError(null));

      return true;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      // toast.info(e?.data?.message);
      return false;
    }
  }
);
export const forgotPassword = createAsyncThunk(
  "forgot/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.forgotPassword(user);

      return response;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      return false;
    }
  }
);
export const signUp = createAsyncThunk(
  "signup/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.singUp(user);
      // toast.info(response?.data?.data?.message);
      saveUser(response?.data?.data?.user);
      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      thunkApi.dispatch(setUser(response?.data?.data?.user));

      return response?.data?.data;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      // toast.info(e?.data?.data?.message);

      return e?.data?.data;
    }
  }
);
export const signUpGoogle = createAsyncThunk(
  "signup/Google/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.loginGoogle(user);
      // toast.info(response?.data?.message);
      saveUser({...response?.data?.data, imageUrl: null});
      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      thunkApi.dispatch(setUser({ ...response?.data?.data, imageUrl: null }));
      thunkApi.dispatch(setEmail(false));

      return response?.data?.data;
    } catch (e) {
      thunkApi.dispatch(setEmail(e?.data?.message));
      return false;
    }
  }
);
export const signUpFacebook = createAsyncThunk(
  "signup/Facebook/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.loginFaceBook(user);
      // toast.info(response?.data?.message);
      saveUser({...response?.data?.data, imageUrl: null});
      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      thunkApi.dispatch(setUser({...response?.data?.data, imageUrl: null}));

      return response?.data?.data;
    } catch (e) {
      thunkApi.dispatch(setEmail(e?.data?.message));

      return false;
    }
  }
);
export const signUpInstagram = createAsyncThunk(
  "signup/Instagram/user",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.loginFaceBook(user);
      saveUser(response?.data?.data);
      setToken(response?.headers?.accesstoken);
      setRefreshToken(response?.headers?.refreshtoken);
      thunkApi.dispatch(setUser(response?.data?.data));

      return response?.data?.data;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      // toast.info(e?.data?.message);
      return e?.data?.email;
    }
  }
);
export const logoutUser = createAsyncThunk(
  "logout/user",
  async (user, thunkApi) => {
    logout();
    Cookies.remove("kaufestoken");
  }
);
export const changePassword = createAsyncThunk(
  "change-password/user",
  async (data, thunkApi) => {
    try {
      const response = await apiServices.updatePassword(data);
      thunkApi.dispatch(setError(null));
      logout();
      return true;
    } catch (response) {
      thunkApi.dispatch(setError(response?.data?.data));

      return response?.data?.data;
    }
  }
);
export const forgetPassword = createAsyncThunk(
  "forget-password/user",
  async (data, thunkApi) => {}
);

export const updateUserProfile = createAsyncThunk(
  "update/user",
  async (data, thunkApi) => {
    try {
      const response = await apiServices.updateUserProfile(data);
      thunkApi.dispatch(setError(null));

      return response;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));

      return e?.data?.data;
    }
  }
);
export const sellerDetails = createAsyncThunk(
  "seller/details",
  async (data, thunkApi) => {
    try {
      const response = await apiServices.readUserDetails(data);
      return response?.data?.data?.user;
    } catch (e) {
      return false;
    }
  }
);
export const verifyOtp = createAsyncThunk(
  "verify/otp",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.verifyOtp(user);
      saveUser(response?.data?.user);
      thunkApi.dispatch(setUser(response?.data?.user));

      // toast.info(response?.message);
      return true;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      toast.info(e?.data?.message);

      return false;
    }
  }
);
export const generateOtp = createAsyncThunk(
  "generate/otp",
  async (user, thunkApi) => {
    try {
      const response = await apiServices.generateOtp(user);
      // toast.info(response?.data?.message);
      return true;
    } catch (e) {
      thunkApi.dispatch(setError(e?.data?.data));
      toast.info(e?.data?.message);

      return false;
    }
  }
);
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload) state.user = action.payload;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(updateUserProfile.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload?.data?.user) {
        saveUser(action.payload?.data?.user);
        state.user = action.payload?.data?.user;
      }
    });
    builder.addCase(updateUserProfile.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signUp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload?.user) state.user = action?.payload?.user;
    });
    builder.addCase(signUp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(verifyOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(verifyOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(verifyOtp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(generateOtp.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(generateOtp.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(generateOtp.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signUpGoogle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpGoogle.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload?.user) state.user = action?.payload?.user;
    });
    builder.addCase(signUpGoogle.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signUpFacebook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpFacebook.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload?.user) state.user = action?.payload?.user;
    });
    builder.addCase(signUpFacebook.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(signUpInstagram.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signUpInstagram.fulfilled, (state, action) => {
      state.loading = false;
      if (action?.payload?.user) state.user = action?.payload?.user;
    });
    builder.addCase(signUpInstagram.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(sellerDetails.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sellerDetails.fulfilled, (state, action) => {
      state.loading = false;
      state.seller = action.payload;
      if (action?.payload?.user) state.user = action?.payload?.user;
    });
    builder.addCase(sellerDetails.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(changePassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(resetPassword.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(forgotPassword.rejected, (state) => {
      state.loading = false;
    });
    // Add reducers for additional action types here, and handle loading state as needed
  },
});
export default authSlice.reducer;
export const { setUser, setError, setEmail } = authSlice.actions;
