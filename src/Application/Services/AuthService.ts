import axios, { AxiosRequestConfig } from "axios";

// const apexAxios = axios.create({
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "application/json",
//     "Accept-Language": "en-US, en;q=0.8",
//   },
// });

axios.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        Accept: "application/json",
        "Content-Type": "application/json",
        "Accept-Language": "en-US, en;q=0.8",
        "X-Access-Token": sessionStorage.getItem("token"),
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
