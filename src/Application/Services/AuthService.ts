import axios, { AxiosRequestConfig } from "axios";

const apexAxios = axios.create({ withCredentials: true });

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  return apexAxios.post(url, data, config);
};

export const get = (url: string, config: AxiosRequestConfig) => {
  return apexAxios.get(url, config);
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  return apexAxios.delete(url, config);
};
