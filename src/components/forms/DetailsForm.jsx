import React from "react";
import "./forms.scss";
import { useForm, useFieldArray } from "react-hook-form";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
// import ReactHtmlParser from "react-html-parser";

const DetailsForm = () => {
  const { control, register, handleSubmit, setValue } = useForm({
    defaultValues: {
      address: [{ country: "", province: "", city: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "address",
  });

  const onSubmit = (data) => {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
  };
  return (
    <form className="newVenue__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Company Name
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              {...register("company_name")}
            />
            <p className="error">dkjg</p>
          </div>
        </div>
      </div>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Company Location
        </label>

        {fields.map(({ id }, index) => {
          return (
            <div className="formInput__group" key={id}>
              <div className="formInput__field">
                <input
                  className="formInput__input"
                  type="text"
                  placeholder="Country"
                  {...register(`address.${index}.country`)}
                />
                <p className="error"></p>
              </div>
              <div className="formInput__field">
                <input
                  className="formInput__input"
                  type="text"
                  placeholder="Province"
                  {...register(`address.${index}.province`)}
                />
                <p className="error"></p>
              </div>
              <div className="formInput__field">
                <input
                  className="formInput__input"
                  type="text"
                  placeholder="City"
                  {...register(`address.${index}.city`)}
                />
                <p className="error"></p>
              </div>

              <button
                className="formBtn__btn"
                type="button"
                onClick={() => append({ country: "", province: "", city: "" })}
              >
                Add Location
              </button>
              {fields.length > 1 && (
                <button
                  className="formBtn__btn"
                  type="button"
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Company Office Timing
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              placeholder="Start Time eg: 9:00 am"
              {...register("company_start_time")}
            />
            <p className="error"></p>
          </div>
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              placeholder="Close Time eg: 6:00 pm"
              {...register("company_close_time")}
            />
            <p className="error"></p>
          </div>
        </div>
      </div>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Company Contact
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              placeholder="+977 9841987654"
              {...register("contact_1")}
            />
            <p className="error"></p>
          </div>
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              placeholder="01 5555111"
              {...register("contact_2")}
            />
            <p className="error"></p>
          </div>
        </div>
      </div>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          Events
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <input
              className="formInput__input"
              type="text"
              placeholder="Wedding, Engagement,...."
              {...register("events")}
            />
            <p className="error"></p>
          </div>
        </div>
      </div>
      <div className="formInput">
        <label className="formInput__title" htmlFor="">
          About Story
        </label>
        <div className="formInput__group">
          <div className="formInput__field">
            <CKEditor
              className="formInput__input"
              {...register("story")}
              editor={ClassicEditor}
              // data="<p>Hello from CKEditor 5!</p>"
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
                console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setValue("story", data);
              }}
              // onBlur={(event, editor) => {
              //   console.log("Blur.", editor);
              // }}
              // onFocus={(event, editor) => {
              //   console.log("Focus.", editor);
              // }}
            />
            <p className="error"></p>
          </div>
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

export default DetailsForm;
