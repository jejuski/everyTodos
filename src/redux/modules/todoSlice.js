import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: [],
  error: null,
  isLoading: false,
  isSuccess: false,
};

export const __getTodosThunk = createAsyncThunk("GET_TODO", async (payload, thunkAPI) => {
  try {
    const { data } = await axios.get("http://localhost:3001/todos");
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.code);
  }
});
export const __editTodoThunk = createAsyncThunk("UPDATE_TODO", async (payload, thunkAPI) => {
  try {
    const id = payload.id;
    const newTodo = payload.editTodo;
    const { data } = await axios.patch(`http://localhost:3001/todos/${id}`, { body: newTodo }, id);
    return thunkAPI.fulfillWithValue(data);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const __deleteTodoThunk = createAsyncThunk("DELETE_TODO", async (payload, thunkAPI) => {
  try {
    await axios.delete(`http://localhost:3001/todos/${payload}`);
    return thunkAPI.fulfillWithValue(payload);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

export const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {},
  extraReducers: {
    [__getTodosThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = action.payload;
    },
    [__getTodosThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__getTodosThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__editTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todo = action.payload;
    },
    [__editTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
    [__editTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodoThunk.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    [__deleteTodoThunk.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    [__deleteTodoThunk.pending]: (state) => {
      state.isLoading = true;
    },
  },
});
export default todoSlice.reducer;
