import { getUsers, deleteUser, getUser } from "./userSlice";
import {
  collection,
  onSnapshot,
  deleteDoc,
  doc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../../firebase";

export const fetchUsers = () => {
  return async (dispatch) => {
    try {
      onSnapshot(collection(db, "users"), (snapShot) => {
        let tableList = [];
        snapShot.forEach((doc) => {
          tableList.push({
            id: doc.id,
            ...doc.data(),
            timeStamp: "",
          });
        });
        dispatch(getUsers(tableList));
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const fetchUser = (id) => {
  return async (dispatch) => {
    try {
      onSnapshot(collection(db, "users"), (snapShot) => {
        snapShot.forEach((doc) => {
          if (doc.id === id) {
            dispatch(getUser(doc.data()));
          }
        });
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const addUser = (data) => {
  return async () => {
    try {
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        timeStamp: serverTimestamp(),
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const updateUser = (data, id) => {
  return async () => {
    try {
        await setDoc(doc(db, "users", id), {
          ...data,
          timeStamp: serverTimestamp(),
        });
    } catch (err) {
      console.log(err);
    }
  };
};

export const removeUser = (id) => {
  return async (dispatch) => {
    try {
      await deleteDoc(doc(db, "users", id));
      dispatch(deleteUser(id));
    } catch (err) {
      console.log(err);
    }
  };
};
