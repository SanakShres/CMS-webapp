import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/user/userSlice";
import bookingReducer from "./features/booking/bookingSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    booking: bookingReducer,
  },
});
