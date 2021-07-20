import axios, { AxiosRequestConfig } from "axios";

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 4 ~ post ~ config",
    config
  );
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 4 ~ post ~ data",
    data
  );
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 4 ~ post ~ url",
    url
  );
  return axios.post(url, data, config);
};

export const get = (url: string, config: AxiosRequestConfig) => {
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 17 ~ get ~ config",
    config
  );
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 17 ~ get ~ url",
    url
  );
  return axios.get(url, config);
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 23 ~ deleteData ~ config",
    config
  );
  console.log(
    "Logged output --> ~ file: AuthService.ts ~ line 23 ~ deleteData ~ url",
    url
  );
  return axios.delete(url, config);
};
