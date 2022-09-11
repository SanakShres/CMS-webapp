import React, { useEffect, useState } from "react";
import "./forms.scss";
import { useForm } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import ImageUploader from "../imageUploader/ImageUploader";

const ServicesForm = () => {
  const [urls, setURLS] = useState([]);
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

  // const handleURL = (url) => {
  //   setUploadedURL(url)
  // }

  const onSubmit = (data) => {
    alert(
      "SUCCESS!! :-)\n\n" +
        JSON.stringify({ ...data, images: urls}, null, 4)
    );
  };

  useEffect(() => {
    reset();
  }, [isSubmitSuccessful, reset]);

  console.log("render")

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
        <ImageUploader id="serviceImages" urlSetter={(data) => setURLS(data)} />
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
