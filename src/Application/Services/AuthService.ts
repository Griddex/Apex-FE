import axios, { AxiosRequestConfig } from "axios";
import authHeaders from "./AuthHeaders";

axios.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        ...authHeaders(),
      },
    };

    return newConfig;
  },
  (err) => {
    return Promise.reject();
  }
);

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  return axios.post(url, data, config);
};

export const get = (url: string, config: AxiosRequestConfig) => {
  return axios.get(url, config);
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  return axios.delete(url, config);
};
