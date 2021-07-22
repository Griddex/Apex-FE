import axios, { AxiosRequestConfig } from "axios";

const apexAxios = axios.create({
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Accept-Language": "en-US, en;q=0.8",
  },
});

apexAxios.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        "X-Access-Token": sessionStorage.getItem("token"),
      },
    };
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 21 ~ newConfig",
      newConfig
    );
    return newConfig;
  },
  (err) => {
    return Promise.reject();
  }
);
apexAxios.interceptors.response.use(
  (config) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 28 ~ config",
      config
    );
    return config;
  },
  (err) => {
    return Promise.reject();
  }
);

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  return apexAxios.post(url, data, config);
};

export const get = (url: string, config: AxiosRequestConfig) => {
  return apexAxios.get(url, config);
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  return apexAxios.delete(url, config);
};
