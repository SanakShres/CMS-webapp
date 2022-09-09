import React, { useState, useEffect } from "react";
import "./forms.scss";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ServicesForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState({
    length: 0,
    imgFiles: [],
  });
  const [urls, setURLS] = useState([]);
  const [uploadProgress, setUploadProgress] = useState({
    percent: 0,
    isUploaded: false,
  });

  const handleServiceChange = (e) => {
    ///converting array-like objects to an array
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    let imageFiles = [];
    if (chosenFiles) {
      chosenFiles.forEach((file) => {
        file["id"] = Math.random();
        imageFiles.push(file);
        setUploadedFiles({
          length: imageFiles.length,
          imgFiles: imageFiles,
        });
        setUploadProgress((prevState) => ({ ...prevState, isUploaded: false }));
      });
    }
  };

  const handleUnselect = (index) => {
    let imageFiles = uploadedFiles.imgFiles;
    imageFiles.splice(index, 1);
    setUploadedFiles({
      length: imageFiles.length,
      imgFiles: imageFiles,
    });
  };

  const handleServiceUpload = () => {
    const uploadFile = () => {
      uploadedFiles.imgFiles.forEach((imgFile) => {
        const imageName = new Date().getTime() + imgFile.name;

        const storageRef = ref(storage, imageName);
        /// ref to collection of images
        const collectionRef = doc(collection(db, "images"));
        const uploadTask = uploadBytesResumable(storageRef, imgFile);
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
            setUploadProgress({ percent: progress, isUploaded: true });
            console.log("Upload is " + progress + "% done");
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
              setDoc(collectionRef, {
                url: downloadURL,
                createdAt: serverTimestamp(),
              });
              setURLS((prevState) => [...prevState, downloadURL]);
            });
          }
        );
      });
    };
    uploadFile();
  };
  console.log("url", urls);

  const {
    register,
    setValue,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({
    // defaultValues: {
    //   services: [
    //     { service_name: "halls", count: 3, people_capacity: 100 },
    //     { service_name: "disco", people_capacity: 15 },
    //   ],
    // },
  });

  const onSubmit = (data) => {
    alert(
      "SUCCESS!! :-)\n\n" +
        JSON.stringify({ ...data, images: uploadedFiles.imgFiles }, null, 4)
    );
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <form className="newVenue__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Service
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              {...register("service_name")}
              placeholder="Service Offerings"
            />
            <p className="error">dkjg</p>
          </div>
        </div>
      </div>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Service Details
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <CKEditor
              className="formInput__input"
              {...register("service_details")}
              editor={ClassicEditor}
              // data="<p>Hello from CKEditor 5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setValue("service_details", data);
              }}
            />
            <p className="error"></p>
          </div>
        </div>
      </div>
      <div className="formInput">
        <div className="formInput__title">Images</div>
        <label className="upload__container" htmlFor="serviceImages">
          <CloudUploadIcon className="upload__icon" />
          <div className="upload__info">
            <span>Browse</span> images here
            <div>Supported files .JPG, .JPEG, .PNG</div>
          </div>
          <input
            name="images"
            type="file"
            multiple
            id="serviceImages"
            onChange={handleServiceChange}
            style={{ display: "none" }}
          />
        </label>
        {uploadedFiles.length > 0 &&
          uploadedFiles.imgFiles.map((file, i) => (
            <div className="upload__images" key={i}>
              <img src={URL.createObjectURL(file)} alt="" />
              <div className="upload__images__details">
                <h4>{file.name}</h4>
                <div>{file.type}</div>
                {uploadProgress.percent}
              </div>
              {uploadProgress.isUploaded ? (
                <div
                  className="upload__images__icon"
                  style={{ backgroundColor: "#EAFFED", cursor: "none" }}
                >
                  <AddTaskOutlinedIcon
                    className="icon"
                    style={{ color: "#00B874" }}
                  />
                </div>
              ) : (
                <div className="upload__images__icon remove">
                  <CloseIcon
                    className="icon"
                    onClick={() => handleUnselect(i)}
                    style={{ color: "#ff0000" }}
                  />
                </div>
              )}
            </div>
          ))}
        {uploadedFiles.length > 0 && !uploadProgress.isUploaded && (
          <div style={{ width: "100%" }}>
            <button
              className="upload__btn"
              type="button"
              onClick={handleServiceUpload}
            >
              Upload images
            </button>
          </div>
        )}
      </div>

      <div className="formBtn">
        <button type="submit" className="formBtn__submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default ServicesForm;
