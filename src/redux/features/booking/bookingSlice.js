import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  item: {},
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    getBookings: (state, action) => {
      state.items = action.payload;
    },
    getBooking: (state, action) => {
      state.item = action.payload;
    },
    deleteBooking: (state, action) => {
      state.items = state.items.filter((booking) => booking.id !== action.payload);
    },
  },
});

export const { getBookings, getBooking, deleteBooking } = bookingSlice.actions;

export default bookingSlice.reducer;
