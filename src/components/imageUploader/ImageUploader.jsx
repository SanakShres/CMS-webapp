import React, { useState } from "react";
import "./imageUploader.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";
import AddTaskOutlinedIcon from "@mui/icons-material/AddTaskOutlined";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageUploader = ({ id, urlSetter }) => {
  const [uploadedFiles, setUploadedFiles] = useState({
    length: 0,
    imgFiles: [],
  });
  const [uploadProgress, setUploadProgress] = useState({
    percent: 0,
    isUploaded: false,
  });

  const handleChange = (e) => {
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

  const handleUpload = () => {
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
            setUploadProgress((prevState) => ({
              ...prevState,
              percent: progress,
            }));
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
              setUploadProgress((prevState) => ({
                ...prevState,
                isUploaded: true,
              }));
              id === "serviceImages" &&
                urlSetter((prevState) => [...prevState, downloadURL]);
            });
          }
        );
      });
    };
    uploadFile();
  };

  return (
    <div className="imageUploader">
      <label className="upload__container" htmlFor={id}>
        <CloudUploadIcon className="upload__icon" />
        <div className="upload__info">
          <span>Browse</span> images here
          <div>Supported files .JPG, .JPEG, .PNG</div>
        </div>
        <input
          name="images"
          type="file"
          multiple
          id={id}
          onChange={handleChange}
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
      {id === "serviceImages" &&
        uploadedFiles.length > 0 &&
        !uploadProgress.isUploaded && (
          <div style={{ width: "100%" }}>
            <button
              className="upload__btn"
              type="button"
              onClick={handleUpload}
            >
              Upload images
            </button>
          </div>
        )}
      {id === "galleryImages" && (
        <button className="g_upload__btn" type="button" onClick={handleUpload}>
          Upload images
        </button>
      )}
    </div>
  );
};

export default ImageUploader;
