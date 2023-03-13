import axios, { AxiosRequestConfig } from 'axios';
import { User, UserCredentialsParams, UserLoginParams } from '../types';

const client = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}`,
});
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: UserCredentialsParams) =>
  client.post(`/user`, data);

export const postLoginUser = (data: UserLoginParams) =>
  client.post(`/auth/login`, data, config);

export const getUserFromSession = () => client.get<User>('user', config);
