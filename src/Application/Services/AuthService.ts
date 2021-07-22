import axios, { AxiosRequestConfig } from "axios";

const token = sessionStorage.getItem("token");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Accept-Language": "en-US, en;q=0.8",
  // Authorization: `Bearer ${token}`,
  "X-Access-Token": token,
};

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  // if (url.endsWith("/signin"))
  //   return axios.post(url, data, { ...config, ...headers });
  //   else return axios.post(url, data, config);
  return axios.post(url, data, { ...config, ...headers });
};

export const get = (url: string, config: AxiosRequestConfig) => {
  return axios.get(url, { ...config, ...headers });
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  return axios.delete(url, { ...config, ...headers });
};
