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
    return {...response.data, email};
  }
);

export const verifyOtpAndToken = createAsyncThunk(
  "/users/email/verify",
  async (values) => {
    console.log(values);
    const response = await axios.put(
      "https://hiring.getbasis.co/candidate/users/email/verify",
      { email: values.email, token: values.token, verificationCode: values.verificationCode }
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
  } catch (error) {
    console.log(error);
  }
});

export const loginSlice = createSlice({
  name: "post",
  initialState: {
    message: "",
    success: null,
    token: "",
    isLogin: null,
    users: null,
    status: "idle",
    error: null,
    email: "",
    step: 1,
    wrongEmailTokenCount: 0
  },
  reducers: {
    resetData :  (state) => {
      state = state.initialState   
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
      state.email = action.payload.email;
      state.step = state.step + 1
      localStorage.setItem(
        "user",
        JSON.stringify({
          isLogin: action.payload?.results?.isLogin,
          token: action.payload?.results?.token,
        })
      );
    },

    [fetchUserEmail.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload?.message;
    },
    [verifyOtpAndToken.pending]: (state) => {
      state.status = "loading";
    },
    [verifyOtpAndToken.fulfilled]: (state, action) => {
      console.log(action.payload.messageObj.wrongEmailTokenCount)
      state.isLogin = action.payload?.results?.isLogin;
      state.user = action.payload?.results?.user;
      state.success = action.payload?.success;
      state.step = action.payload.results.isLogin ? 4 : 3
      state.wrongEmailTokenCount = action.payload.messageObj.wrongEmailTokenCount<= 3 ? true : false
    },
    [verifyOtpAndToken.rejected]: (state, action) => {
      state.status = "error";
      state.error = action.payload?.message;
    },
  },
});

export default loginSlice.reducer;

// "firstName": "Mehul",
//       "email": "mehul@gmail.com",
//       "referredCodeKey": "",
//       "agreeToPrivacyPolicy": true,
//       "token": "",
//       "source": "WEB_APP"
