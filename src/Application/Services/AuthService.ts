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
