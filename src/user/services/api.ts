import axios, { AxiosRequestConfig } from 'axios';
import { UserCredentialsParams, UserLoginParams } from '../types';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: UserCredentialsParams) =>
  client.post(`/user`, data);

export const postLoginUser = (data: UserLoginParams) =>
  client.post(`/auth/login`, data, config);
