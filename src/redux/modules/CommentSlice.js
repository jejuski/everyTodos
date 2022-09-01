import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  comment: [],
};

export const __getCommentList = createAsyncThunk(
  "comment/GET_ COMMENT_LIST",
  async (payload, thunkAPI) => {
    const { data } = await axios.get(
      `https://mighty-mesa-95668.herokuapp.com/comment?todoId=${payload}`
    );
    return thunkAPI.fulfillWithValue(data);
  }
);

export const addComment = createAsyncThunk(
  "ADD_COMMENT",
  async (payload, thunkAPI) => {
    const { data } = await axios.post(
      "https://mighty-mesa-95668.herokuapp.com/comment",
      payload
    );
    return thunkAPI.fulfillWithValue(data);
  }
);

export const toggleComment = createAsyncThunk(
  "TOGGLE_COMMENT",
  async (payload, thunkAPI) => {
    const { data } = await axios.post(
      "https://mighty-mesa-95668.herokuapp.com/comment",
      payload
    );
    return thunkAPI.fulfillWithValue(data);
  }
);

export const __editComment = createAsyncThunk(
  "EDIT_COMMENT",
  async (payload, thunkAPI) => {
    const doneCheck = payload.editCheck;
    const id = payload.id;
    const { data } = await axios.patch(
      `https://mighty-mesa-95668.herokuapp.com/comment/${payload.id}?todoId=${payload.todoId}`,
      { editCheck: !doneCheck },
      id
    );
    return thunkAPI.fulfillWithValue(data);
  }
);

// @param {String}// 삭제할 객체의 id
export const __removeComment = createAsyncThunk(
  "REMOVE_COMMENT",
  async (payload, thunkAPI) => {
    const res = await axios.delete(
      `https://mighty-mesa-95668.herokuapp.com/comment/${payload.id}?todoId=${payload.todoId}`
    );
    return thunkAPI.fulfillWithValue(res);
  }
);

export const __saveComment = createAsyncThunk(
  "SAVE_COMMENT",
  async (payload, thunkAPI) => {
    const doneCheck = payload.editCheck;
    const saveComment = payload.comment;
    const id = payload.id;
    const { data } = await axios.patch(
      `https://mighty-mesa-95668.herokuapp.com/comment/${payload.id}?todoId=${payload.todoId}`,
      { editCheck: !doneCheck, comment: saveComment },
      id
    );
    return thunkAPI.fulfillWithValue(data);
  }
);

export const CommentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {},
  extraReducers: {
    [__getCommentList.fulfilled]: (state, action) => {
      state.comment = action.payload;
    },

    [addComment.fulfilled]: (state, action) => {
      console.log(state.comment, "state.comment");
      state.comment.push(action.payload);
    },

    [__removeComment.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.comment = state.comment.filter(
        (comment) => comment.id !== action.payload.id
      );
      console.log(action.payload);
    },

    [__saveComment.fulfilled]: (state, action) => {
      state.comment = action.payload;
    },
  },
});

export default CommentSlice.reducer;
