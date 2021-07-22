import axios, { AxiosRequestConfig } from "axios";

const token = sessionStorage.getItem("token");
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Accept-Language": "en-US, en;q=0.8",
  // Authorization: `Bearer ${token}`,
  "X-Access-Token": token,
};

const apexAxios = axios.create({
  headers,
});

apexAxios.interceptors.request.use(
  (config) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 17 ~ config",
      config
    );

    return config;
  },
  (err) => {
    console.log(
      "Logged output --> ~ file: AuthService.ts ~ line 21 ~ err",
      err
    );
    return Promise.reject();
  }
);

export const post = (url: string, data: any, config: AxiosRequestConfig) => {
  // if (url.endsWith("/signin"))
  //   return axios.post(url, data, { ...config, ...headers });
  //   else return axios.post(url, data, config);
  return apexAxios.post(url, data, { ...config, ...headers });
};

export const get = (url: string, config: AxiosRequestConfig) => {
  return apexAxios.get(url, { ...config, ...headers });
};

export const deleteData = (url: string, config: AxiosRequestConfig) => {
  return apexAxios.delete(url, { ...config, ...headers });
};
