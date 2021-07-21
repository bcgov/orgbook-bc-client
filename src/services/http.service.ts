import Axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

export type HttpResponse<T> = AxiosResponse<T>;
export type HttpRequestConfig = AxiosRequestConfig;

export default class Http {
  static async get<T>(
    url: string,
    config: HttpRequestConfig = {}
  ): Promise<HttpResponse<T>> {
    return Axios.get(url, { headers, ...config });
  }

  static async post<T>(
    url: string,
    req: T,
    config: HttpRequestConfig = {},
  ): Promise<HttpResponse<T>> {
    return Axios.post(url, req, { headers, ...config });
  }
}
