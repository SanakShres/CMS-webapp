import * as yup from "yup";

export const usersSchema = yup.object().shape({
  // image: yup
  //   .mixed()
  //   .nullable()
  //   .test(
  //     "fileSize",
  //     "The file is too large",
  //     (value) => !value || (value && value.size <= 1024 * 1024)
  //   )
  //   .test(
  //     "format",
  //     "upload img file",
  //     (value) =>
  //       !value ||
  //       (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
  //   ),
  fname: yup.string().required("Required"),
  lname: yup.string().required("Required"),
  contact: yup
    .string()
    .required("Required")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Phone number is not valid"
    ),
  address: yup.string().required("Required"),
  username: yup.string().required("Required"),
  email: yup.string().email("Please input valid email").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .max(16),
  cpassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const bookingsSchema = yup.object().shape({
  //   image: yup
  //     .mixed()
  //     .nullable()
  //     .test(
  //       "Fichier taille",
  //       "upload file",
  //       (value) => !value || (value && value.size <= 1024 * 1024)
  //     )
  //     .test(
  //       "format",
  //       "upload file",
  //       (value) =>
  //         !value ||
  //         (value && ["image/jpg", "image/jpeg", "image/png"].includes(value.type))
  //     ),
  event: yup.string().required("Required"),
  timing: yup.array().required("Required"),
  price: yup
    .number()
    .typeError("You must specify a number")
    .positive()
    .integer()
    .required("Required"),
  eventDate: yup
    .date()
    .typeError("Invalid date")
    .min(new Date())
    .required("Required"),
  custName: yup.string().required("Required"),
  address: yup.string().required("Required"),
  contact: yup
    .string()
    .required("Required")
    .matches(
      /^(\+?\d{0,4})?\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{3}\)?)\s?-?\s?(\(?\d{4}\)?)?$/,
      "Phone number is not valid"
    ),
});
