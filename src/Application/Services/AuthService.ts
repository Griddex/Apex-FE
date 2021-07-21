import axios, { AxiosRequestConfig } from "axios";

axios.defaults.withCredentials = true;
axios.interceptors.request.use(
  (config) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 5 ~ config",
      config
    );
    return config;
  },
  (error) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 8 ~ error",
      error
    );
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (reponse) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 5 ~ reponse",
      reponse
    );
    return reponse;
  },
  (error) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 8 ~ error",
      error
    );
    return Promise.reject(error);
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
