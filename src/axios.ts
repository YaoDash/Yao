console.log("hello")

import axios, {
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig,
  AxiosError,
  AxiosResponse,
} from 'axios';

class Request {
  private instance: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.instance = axios.create(config);

    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        return response.data;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
  }

  fetchData<T>(options: AxiosRequestConfig): Promise<T> {
    return new Promise((_resolve, reject) => {
      this.instance
        .request<T>(options)
        .then((res) => {
          return reject(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  get<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData<T>({ ...options, method: 'GET' });
  }

  post<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData<T>({ ...options, method: 'POST' });
  }

  put<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData<T>({ ...options, method: 'PUT' });
  }

  delete<T>(options: AxiosRequestConfig): Promise<T> {
    return this.fetchData<T>({ ...options, method: 'DELETE' });
  }
}

export const http = new Request({
  baseURL: 'https://mock.mengxuegu.com/mock/6323def2b4c53348ed2bc5d7/example',
});