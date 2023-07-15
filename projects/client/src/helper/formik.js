import { useFormik } from "formik";
import * as yup from "yup";

const useFormikValidation = (onRegister) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmation: "",
      birthdate: "",
      gender: "",
      phone: "",
    },
    validationSchema: yup.object().shape({
      name: yup.string().required("Name is required"),
      username: yup
        .string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters"),
      email: yup.string().required("Email is required").email("Invalid email"),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
      confirmation: yup
        .string()
        .required("Confirmation is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
      birthdate: yup.string().required("Birthdate is required"),
      gender: yup.string().required("Gender is required"),
      phone: yup.string().required("Phone number is required"),
    }),
    onSubmit: (values) => {
      onRegister(values);
    },
  });
  return formik;
};

export { useFormikValidation };
