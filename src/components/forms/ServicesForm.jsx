import React, { useState, useEffect } from "react";
import "./forms.scss";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CloseIcon from "@mui/icons-material/Close";

const ServicesForm = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {}, [uploadedFiles]);
  console.log("first");

  const handleUploadFiles = (e) => {
    ///converting array-like objects to an array
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    let imageFiles = [];
    chosenFiles.forEach((file) => {
      imageFiles.push(file);
      setUploadedFiles(imageFiles);
    });
  };

  const handleUnselect = (index) => {
    let imageFiles = uploadedFiles;
    imageFiles.splice(index, 1);
    setUploadedFiles(imageFiles);
  };
  console.log(uploadedFiles);

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
        JSON.stringify({ ...data, images: uploadedFiles }, null, 4)
    );
    console.log({ ...data, images: uploadedFiles });
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
        <label className="upload__container" htmlFor="inputImages">
          <CloudUploadIcon className="upload__icon" />
          <div className="upload__info">
            <span>Browse</span> images here
            <div>Supported files .JPG, .JPEG, .PNG</div>
          </div>
          <input
            name="images"
            type="file"
            multiple
            id="inputImages"
            onChange={handleUploadFiles}
            style={{ display: "none" }}
          />
        </label>
        {uploadedFiles &&
          uploadedFiles.map((file, i) => (
            <div className="upload__images" key={i}>
              <img src={URL.createObjectURL(file)} alt="" />
              <div className="upload__images__details">
                <h4>{file.name}</h4>
                <div>{file.type}</div>
              </div>
              <CloseIcon
                className="upload__images__remove"
                onClick={() => handleUnselect(i)}
              />
            </div>
          ))}
        <div style={{ width: "100%" }}>
          <button className="upload__btn">Upload images</button>
        </div>
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
