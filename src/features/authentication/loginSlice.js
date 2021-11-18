import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUserEmail = createAsyncThunk(
  "/users/email",
  async (email) => {
    const response = await axios.post(
      "https://hiring.getbasis.co/candidate/users/email",
      { email: email }
    );
    console.log(response);
    return { ...response.data, email };
  }
);

export const verifyOtpAndToken = createAsyncThunk(
  "/users/email/verify",
  async (values) => {
    console.log(values);
    const response = await axios.put(
      "https://hiring.getbasis.co/candidate/users/email/verify",
      {
        email: values.email,
        token: values.token,
        verificationCode: values.verificationCode,
      }
    );
    console.log(response);
    return response.data;
  }
);

export const postSignUpDetails = createAsyncThunk("/users", async (values) => {
  console.log(values);
  try {
    const response = await axios.post(
      "https://hiring.getbasis.co/candidate/users",
      {
        firstName: values.firstName,
        email: values.email,
        referredCodeKey: values.referredCodeKey,
        agreeToPrivacyPolicy: values.agreeToPrivacyPolicy,
        token: values.token,
        source: values.source,
      }
    );
    console.log(response);
    return response.data
  } catch (error) {}
});

export const logoutUser = createAsyncThunk(
  "/users/logout/id",
  async (values) => {
    console.log(values);
    const response = await axios.delete(
      `https://hiring.getbasis.co/candidate/users/logout/${values.id}`,
      {
        headers: {
          Authorization: `Bearer ${values.id},${values.token}`,
        },
      }
    );
    console.log(response);
  }
);
const InitialState = {
  message: "",
  success: null,
  userSignup: null,
  token: "",
  isLogin: null,
  users: null,
  status: "idle",
  error: null,
  email: "",
  step: 1,
  userLoggedIn : false,
  wrongEmailTokenCount: 1,
}

export const loginSlice = createSlice({
  name: "post",
  initialState : InitialState,
  reducers: {
    resetData: (state) => {
      state = InitialState;
    },
  },
  extraReducers: {
    [fetchUserEmail.pending]: (state) => {
      state.status = "loading";
    },

    [fetchUserEmail.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.message = action.payload?.message;
      state.success = action.payload?.success;
      state.token = action.payload?.results?.token;
      state.isLogin = action.payload?.results?.isLogin;
      state.userLoggedIn = true
      state.email = action.payload.email;
      state.step = 2;
    },

    [fetchUserEmail.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload?.message;
    },
    [verifyOtpAndToken.pending]: (state) => {
      state.status = "loading";
    },
    [verifyOtpAndToken.fulfilled]: (state, action) => {
      state.isLogin = action.payload?.results?.isLogin;
      state.user = action.payload?.results?.user;
      state.success = action.payload?.success;
      state.message = action.payload.message;
      state.step = action.payload?.results?.isLogin ? 4 : 3;
      state.wrongEmailTokenCount =
        action.payload?.messageObj?.wrongEmailTokenCount < 3 ? true : false;
    },
    [verifyOtpAndToken.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload?.message;
    },
    [postSignUpDetails.pending]: (state) => {
      state.status = "loading";
    },
    [postSignUpDetails.fulfilled]: (state, action) => {
      console.log(state.success)
      console.log(action.payload?.success)
      state.status = "fulfilled";
      state.success = action.payload?.success ? true : false
      state.user = action.payload?.results?.user;
      state.message = action.payload?.message;
      state.userSignup = action.payload?.success ? true : false
      state.step = 4
      console.log(state.success)
    },
    [postSignUpDetails.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload.message;
    },
    [logoutUser.pending] : (state) => {
      state.status = "loading"
    },
    [logoutUser.fulfilled] : (state,action) => {
      state.status = "fulfilled"
      state.message = action.payload?.message
      state.success = action.payload?.success
      state.user = action.payload?.results
    },
    [logoutUser.error] : (state, action) => {
      state.error = "error"
      state.error = action.payload.message
    }
  },
});

export const { resetData } = loginSlice.actions
export default loginSlice.reducer;
