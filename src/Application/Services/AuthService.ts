import axios from "axios";

const apexAxios = axios.create({
  withCredentials: true,
});
console.log(
  "Logged output --> ~ file: AuthService.ts ~ line 6 ~ apexAxios",
  apexAxios
);

export const post = (url: string, data: any, config: any) => {
  return apexAxios.post(url, data, config);
};

export const get = (url: string, config: any) => {
  return apexAxios.get(url, config);
};

export const deleteData = (url: string, config: any) => {
  return apexAxios.delete(url, config);
};
