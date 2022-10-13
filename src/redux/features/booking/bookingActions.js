import { getBookings, deleteBooking, getBooking } from "./bookingSlice";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export const fetchBookings = () => {
  return async (dispatch) => {
    try {
      onSnapshot(collection(db, "bookings"), (snapShot) => {
        let tableList = [];
        snapShot.forEach((doc) => {
          tableList.push({
            id: doc.id,
            ...doc.data(),
            timing: doc.data().timing.map((time) => time.label),
            eventDate:
              doc.data().eventDate &&
              formatDate(doc.data().eventDate.seconds * 1000),
            timeStamp: "",
          });
        });
        dispatch(getBookings(tableList));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchBooking = (id) => {
  return async (dispatch) => {
    try {
      onSnapshot(collection(db, "bookings"), (snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.id === id) {
            dispatch(getBooking(doc.data()));
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addBooking = (data) => {
  return async () => {
    try {
      await addDoc(collection(db, "bookings"), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateBooking = (data, id) => {
  return async () => {
    try {
      await setDoc(doc(db, "bookings", id), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeBooking = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "bookings", id));
      dispatch(deleteBooking(id));
    } catch (err) {
      console.log(err);
    }
  };
};
