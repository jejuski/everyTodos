import { configureStore } from "@reduxjs/toolkit";
import todos from "../redux/modules/todoSlice";
import comment from "../redux/modules/CommentSlice";

const store = configureStore({
  reducer: {
    todos,
    comment,
  },
});

export default store;
