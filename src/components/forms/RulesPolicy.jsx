import React from "react";
import "./forms.scss";
import { useForm, useFieldArray } from "react-hook-form";

const RulesPolicy = () => {
  const { control, register, handleSubmit } = useForm({
    defaultValues: {
      rules_policy: [{ title: "", contents: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "rules_policy",
  });

  const onSubmit = (data) => {
    alert("SUCCESS!! :-)\n\n" + JSON.stringify(data, null, 4));
  };
  return (
    <form className="newVenue__form" onSubmit={handleSubmit(onSubmit)}>
      <div className="formInput">
        {fields.map(({ id }, index) => {
          return (
            <div
              className="formInput__group"
              key={id}
              style={{ flexDirection: "column" }}
            >
              <div className="formInput__field">
                <label className="formInput__title" htmlFor="">
                  Title
                </label>
                <input
                  className="formInput__input"
                  type="text"
                  placeholder="Rules and Polices"
                  {...register(`rules_policy.${index}.title`)}
                />
                <p className="error"></p>
              </div>
              <div className="formInput__field">
                <label className="formInput__title" htmlFor="">
                  Detailed Information
                </label>
                <textarea
                  className="formInput__input"
                  type="text"
                  placeholder="Things to know..."
                  {...register(`rules_policy.${index}.contents`)}
                />
                <p className="error"></p>
              </div>
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
        <button
          className="formBtn__btn"
          type="button"
          onClick={() => append({ title: "", contents: "" })}
        >
          Add Rules and/or Policy
        </button>
      </div>
      <div className="formBtn">
        <button type="submit" className="formBtn__submit">
          Save
        </button>
      </div>
    </form>
  );
};

export default RulesPolicy;
