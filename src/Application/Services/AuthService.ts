import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  return axios.post(url, data, config);
};

export const get = (url: string, config: AxiosRequestConfig) => {
  return axios.get(url, config);
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  return axios.delete(url, config);
};
