import axios from "axios";

export const post = (url: string, data: any, config: any) => {
  return axios.post(url, data, config);
};

export const get = (url: string, config: any) => {
  return axios.get(url, config);
};

export const deleteData = (url: string, config: any) => {
  return axios.delete(url, config);
};

// import decodeJwt from "jwt-decode";

// let currentUserToken = null;

// export function setToken(token) {
//   currentUserToken = token;
// }

// export default function authService(type) {
//   if (currentUserToken !== null) {
//     if (type === "token") {
//       return currentUserToken;
//     } else {
//       const identity = decodeJwt(currentUserToken);
//       return identity;
//     }
//   } else {
//     if (type === "token") {
//       return window.sessionStorage.getItem("token");
//     } else {
//       const userToken = window.sessionStorage.getItem("token");
//       const identity = decodeJwt(userToken);
//       return identity;
//     }
//   }
// }
