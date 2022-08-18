import React, { useEffect, useState } from "react";

import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { usersSchema } from "../../schema";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from "react-router-dom";

const UsersForm = ({ inputs }) => {
  const [inputImage, setInputImage] = useState(null);
  const [imgURL, setImgURL] = useState("");
  const [imgPercent, setImgPercent] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: yupResolver(usersSchema),
  });

  useEffect(() => {
    reset();
    setInputImage(null);
  }, [isSubmitSuccessful, reset]);

  const handleUpload = () => {
    const uploadFile = () => {
      const imageName = new Date().getTime() + inputImage.name;
      // const imageName = "user_id"; //to store single image of same user

      const storageRef = ref(storage, imageName);

      const uploadTask = uploadBytesResumable(storageRef, inputImage);

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
          setImgPercent(progress);
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
            setImgURL(downloadURL);
            setUploadSuccess(true);
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
      const res = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      );
      await setDoc(doc(db, "users", res.user.uid), {
        ...data,
        image: imgURL,
        timeStamp: serverTimestamp(),
      });
      setTimeout(() => {
        navigate(-1);
      }, 1000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="newItem__bottom">
      <div className="newItem__left">
        <img
          src={
            inputImage
              ? URL.createObjectURL(inputImage)
              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          }
          alt=""
        />
        <div className="formInput__img">
          <label htmlFor="inputFile" className="upload__container">
            Browse image <DriveFolderUploadIcon />
          </label>
          <input
            {...register("image")}
            type="file"
            id="inputFile"
            onChange={(e) => {
              setInputImage(e.target.files[0]);
              setUploadSuccess(false);
            }}
            style={{ display: "none" }}
          />
          <p className="error">{errors.image?.message}</p>
        </div>
        {inputImage !== null && !uploadSuccess && (
          <button
            className="upload__btn"
            disabled={imgPercent !== null && imgPercent < 100}
            onClick={handleUpload}
          >
            Upload image <CloudUploadOutlinedIcon />
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
              disabled={imgPercent !== null && imgPercent < 100}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UsersForm;
