import axios, { AxiosRequestConfig } from 'axios';
import { User, UserCredentialsParams, UserLoginParams } from '../types';

const client = axios.create({
  baseURL: 'http://localhost:3000/api',
});
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: UserCredentialsParams) =>
  client.post(`/user`, data);

export const postLoginUser = (data: UserLoginParams) =>
  client.post(`/auth/login`, data, config);

export const signinWithGoogle = () => client.get('/auth/google/login');

export const getUserFromSession = () => client.get<User>('user', config);
