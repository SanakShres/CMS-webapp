import React, { useEffect, useState } from "react";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usersSchema } from "../../schema";
import { doc, collection, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchUser,
  addUser,
  updateUser,
} from "../../redux/features/user/userActions";
import { isEmptyObject } from "jquery";

const UsersForm = ({ inputs }) => {
  const user = useSelector((state) => state.user.item);
  const [allowRender, setAllowRender] = useState(false);
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
    defaultValues: {},
    resolver: yupResolver(usersSchema),
  });

  useEffect(() => {
    try {
      if (id) {
        dispatch(fetchUser(id));
      } else {
        setAllowRender(true);
      }
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, id]);

  console.log("user", user);

  useEffect(() => {
    try {
      if (id && !isEmptyObject(user)) {
        reset(user);
        setAllowRender(true);
      } else reset();
    } catch (err) {
      console.log(err);
    }
  }, [reset, user, id]);

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
      uploadTask.on(
        "state_changed",
        (snapshot) => {
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
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImgFile((prevState) => ({ ...prevState, url: downloadURL }));
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

  const onSubmit = (data) => {
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
    try {
      if (id) {
        dispatch(
          updateUser(
            {
              ...data,
              image: imgFile.url !== "" ? imgFile.url : user.image,
            },
            id
          )
        );
      } else dispatch(addUser({ ...data, image: imgFile.url }));
      setTimeout(() => {
        navigate("/users");
      }, 500);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {allowRender && (
        <div className="newItem__bottom">
          <div className="newItem__left">
            {id && user.image ? (
              <img src={user.image} alt="" />
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
              <label htmlFor="userImage" className="upload__container">
                Browse image <DriveFolderUploadIcon />
              </label>
              <input
                {...register("image")}
                type="file"
                id="userImage"
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
                type="button"
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
                      render={({ field: { onChange, ref } }) => (
                        <Select
                          inputRef={ref}
                          onChange={(val) => onChange(val.map((c) => c.value))}
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
                  {id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default UsersForm;
