// import axios from "axios";

// const api = axios.create({
//   baseURL: `${process.env.BASE_URL}`,
//   headers: {
//     key: "Bangunin_ini_3_orang",
//   },
// });

// console.log("envprocess", process.env.REACT_APP_BASE_URL);
// // membuat instance untuk axios
// // pada saat kita memanggil variable api maka
// //kita sama dengan menggunakan axios dengan base url localhost:2000

// export default api;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:2000",
});
// membuat instance untuk axios
// pada saat kita memanggil variable api maka
//kita sama dengan menggunakan axios dengan base url localhost:2000

export default api;
