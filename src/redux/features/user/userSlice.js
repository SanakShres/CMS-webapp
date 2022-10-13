import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.items = action.payload;
    },
    getUser: (state, action) => {
      state.item = action.payload;
    },
    deleteUser: (state, action) => {
      state.items = state.items.filter((user) => user.id !== action.payload);
    },
  },
});

export const { getUsers, getUser, deleteUser } = userSlice.actions;

export default userSlice.reducer;
