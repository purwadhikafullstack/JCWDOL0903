import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormRegister from "../components/FormRegister";
import api from "../api/api";

const Register = () => {
  const navigate = useNavigate();

  const onRegister = async (values) => {
    try {
      const data = {
        name: values.name,
        username: values.username,
        email: values.email,
        password: values.password,
        password_confirmation: values.confirmation,
        phone_num: values.phone,
        gender: values.gender,
        birthdate: values.birthdate,
      };

      const result = await api.post("/auth/register", data);

      await Swal.fire({
        icon: "success",
        title: result.data.message,
        showConfirmButton: false,
        timer: 1500,
      });

      navigate("/login");
    } catch (error) {
      // console.log(error);
      Swal.fire({
        icon: "error",
        title: error.response.data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div>
      <FormRegister onRegister={onRegister} />
    </div>
  );
};

export default Register;
