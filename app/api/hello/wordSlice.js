import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "./constant";

export const getWords = createAsyncThunk("getWords", async () => {
  try {
    const response = await axios.get("/get_all_data");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
});
export const getCategories = createAsyncThunk("getCategories", async () => {
  try {
    const response = await axios.get("/get_all_category");
    return response.data;
  } catch (error) {
    throw new Error(
      error.response ? error.response.data.message : error.message
    );
  }
});
export const addNewCategory = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/add_new_category", payload);

      dispatch({
        type: "ADD_NEW_CATEGORY_SUCCESS",
        payload: response.data,
      });

      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: "ADD_NEW_CATEGORY_FAILURE",
        error: error.message,
      });

      return Promise.reject(error);
    }
  };
};
export const addNewPost = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/add_new_post", payload);

      dispatch({
        type: "ADD_NEW_POST_SUCCESS",
        payload: response.data,
      });

      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: "ADD_NEW_POST_FAILURE",
        error: error.message,
      });

      return Promise.reject(error);
    }
  };
};
export const logIn = (payload) => {
  return async (dispatch) => {
    try {
      const response = await axios.post("/login", payload);

      dispatch({
        type: "login",
        payload: response.data,
      });

      return Promise.resolve();
    } catch (error) {
      dispatch({
        type: "login error",
        error: error.message,
      });

      return Promise.reject(error);
    }
  };
};
const wordSlice = createSlice({
  name: "words",
  initialState: {
    words: [],
    status: "idle",
    error: null,
    isLoggedIn: false,
    userData: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getWords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getWords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.words = action.payload;
      })
      .addCase(getWords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.words = action.payload;
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // builder
    //   .addCase(loggedIn.pending, (state) => {
    //     state.status = "loading";
    //   })
    //   .addCase(loggedIn.fulfilled, (state, action) => {
    //     state.status = "succeeded";
    //     state.isLoggedIn = true; // Set login status to true
    //     state.userData = action.payload; // Save user data in the state
    //   })
    //   .addCase(loggedIn.rejected, (state, action) => {
    //     state.status = "failed";
    //     state.error = action.error.message;
    //     state.isLoggedIn = false; // Ensure that the user is not logged in on failure
    //     state.userData = null; // Clear any user data in case of failure
    //   });
  },
});

export default wordSlice.reducer;
