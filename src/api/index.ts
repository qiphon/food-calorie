import axios, { AxiosRequestConfig } from "axios";

const baseURL =
  process.env.NODE_ENV === "production" ? process.env.REACT_APP_BASE_URL : "";
const requestBase = {
  app_id: process.env.REACT_APP_APP_ID,
  app_key: process.env.REACT_APP_APP_KEY,
};

type GetParams = {
  url: string;
  data?: {
    [key: string]: any;
  };
} & Omit<AxiosRequestConfig, "data">;

const get = ({ url, params, ...args }: GetParams) =>
  axios.get(url, { baseURL, ...args, params: { ...params, ...requestBase } });

const post = ({ url, data, params, ...args }: GetParams) =>
  axios.post(
    url,
    { ...data },
    { baseURL, ...args, params: { ...params, ...requestBase } }
  );

export { get, post };
