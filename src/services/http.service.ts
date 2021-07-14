import Axios, { AxiosResponse } from "axios";

const headers: Record<string, string> = {
  "Content-Type": "application/json",
};

export type HttpResponse<T> = AxiosResponse<T>;

export default class Http {
  static async get<T>(url: string): Promise<HttpResponse<T>> {
    return Axios.get(url, { headers });
  }

  static async post<T>(url: string, req: T): Promise<HttpResponse<T>> {
    return Axios.post(url, req, { headers });
  }
}
