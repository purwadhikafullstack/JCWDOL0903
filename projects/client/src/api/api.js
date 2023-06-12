import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2000",
});
// membuat instance untuk axios
// pada saat kita memanggil variable api maka
//kita sama dengan menggunakan axios dengan base url localhost:2000

export default api;
