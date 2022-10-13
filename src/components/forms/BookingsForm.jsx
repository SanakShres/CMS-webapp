import React, { useEffect, useState } from "react";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingsSchema } from "../../schema";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchBooking,
  addBooking,
  updateBooking,
} from "../../redux/features/booking/bookingActions";
import { isEmptyObject } from "jquery";
import moment from "moment";

const BookingsForm = ({ inputs }) => {
  const booking = useSelector((state) => state.booking.item);
  const [formRender, setFormRender] = useState(false);
  const [imgFile, setImgFile] = useState({
    input: null,
    url: "",
    uploadProgress: 0,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(bookingsSchema),
  });

  useEffect(() => {
    try {
      if (id) {
        dispatch(fetchBooking(id));
      } else {
        setFormRender(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id]);

  console.log("booking", booking);

  useEffect(() => {
    if (id && !isEmptyObject(booking)) {
      const date = moment(booking.eventDate.seconds * 1000).format(
        "YYYY-MM-DD"
      );
      reset({ ...booking, eventDate: date });
      setFormRender(true);
    } else reset();
  }, [booking, id, reset]);

  // useEffect(() => {
  //   reset();
  //   setImgFile((prevState) => ({...prevState, input:null}))
  // }, [isSubmitSuccessful, reset]);

  const handleUpload = () => {
    const uploadFile = () => {
      const imageName = new Date().getTime() + imgFile.input.name;
      // const imageName = "user_id"; //to store single image of same user

      const storageRef = ref(storage, imageName);
      /// ref to collection of images
      const collectionRef = doc(collection(db, "images"));

      const uploadTask = uploadBytesResumable(storageRef, imgFile.input);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setImgFile((prevState) => ({
            ...prevState,
            uploadProgress: progress,
          }));
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgFile((prevState) => ({
              ...prevState,
              url: downloadURL,
            }));
            setDoc(collectionRef, {
              url: downloadURL,
              createdAt: serverTimestamp(),
            });
            alert("Upload Successful");
          });
        }
      );
    };
    uploadFile();
  };

  const onSubmit = async (data) => {
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    try {
      if (id) {
        dispatch(
          updateBooking(
            {
              ...data,
              image: imgFile.url !== "" ? imgFile.url : booking.image,
            },
            id
          )
        );
      } else dispatch(addBooking({ ...data, image: imgFile.url }));
      setTimeout(() => {
        navigate("/bookings");
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {formRender && (
        <div className="newItem__bottom">
          <div className="newItem__left">
            {id && booking.image ? (
              <img src={booking.image} alt="" />
            ) : (
              <img
                src={
                  imgFile.input
                    ? URL.createObjectURL(imgFile.input)
                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                }
                alt=""
              />
            )}
            <div className="formInput__img">
              <label htmlFor="bookingImage" className="upload__container">
                Browse image <DriveFolderUploadIcon />
              </label>
              <input
                {...register("image")}
                type="file"
                id="bookingImage"
                onChange={(e) => {
                  setImgFile({
                    input: e.target.files[0],
                    url: "",
                    uploadProgress: 0,
                  });
                }}
                style={{ display: "none" }}
              />
              <p className="error">{errors.image?.message}</p>
            </div>
            {imgFile.input !== null && imgFile.url === "" && (
              <div
                className="progress-bar"
                style={{ width: imgFile.uploadProgress + "%" }}
              ></div>
            )}
            {imgFile.input !== null && imgFile.url === "" && (
              <button
                className="upload__btn"
                disabled={
                  imgFile.uploadProgress !== 0 && imgFile.uploadProgress < 100
                }
                onClick={handleUpload}
              >
                {imgFile.uploadProgress !== 0 && imgFile.uploadProgress < 100
                  ? "Uploading..."
                  : "Upload image"}{" "}
                <CloudUploadOutlinedIcon />
              </button>
            )}
          </div>
          <div className="newItem__right">
            <form className="newItem__form" onSubmit={handleSubmit(onSubmit)}>
              {inputs.map((input) =>
                input.type === "multiselect" ? (
                  <div className="formInput" key={input.id}>
                    <label htmlFor="">{input.label}</label>
                    <Controller
                      control={control}
                      name={input.name}
                      render={({ field: { onChange, ref, value } }) => (
                        <Select
                          ref={ref}
                          // onChange={(val) => onChange(val.map((c) => c.value))}
                          value={value}
                          onChange={onChange}
                          options={input.options}
                          isMulti
                          className="formInput__select"
                          classNamePrefix="select"
                        />
                      )}
                    />
                    <p className="error">{errors[input.name]?.message}</p>
                  </div>
                ) : (
                  <div className="formInput" key={input.id}>
                    <label htmlFor="">{input.label}</label>
                    <input
                      className="formInput__input"
                      {...register(input.name)}
                      type={input.type}
                      placeholder={input.placeholder && input.placeholder}
                    />
                    <p className="error">{errors[input.name]?.message}</p>
                  </div>
                )
              )}
              <div className="formBtn">
                <button
                  type="submit"
                  disabled={
                    imgFile.uploadProgress !== 0 && imgFile.uploadProgress < 100
                  }
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookingsForm;
