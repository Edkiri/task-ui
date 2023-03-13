import axios, { AxiosRequestConfig } from 'axios';
import { APIDeleteResponse } from '../../types';
import { IList, List, updateListInterface } from '../types/list';

const client = axios.create({
  baseURL: `${import.meta.env.VITE_REACT_APP_API_URL}/list`,
});
const config: AxiosRequestConfig = { withCredentials: true };

export async function createOne(list: List) {
  const { data } = await client.post<IList>('/', list, config);
  return data;
}

export async function updateOne({ id, title }: updateListInterface) {
  const { data } = await client.put<IList>(
    `/${id}`,
    {
      title,
    },
    config,
  );
  return data;
}

export interface findBySlugInterface {
  slugName: string;
}
export async function getOne({ slugName }: findBySlugInterface) {
  const { data } = await client.get<IList>(`/${slugName}`, config);
  return data;
}

export async function findAll() {
  const { data } = await client.get<IList[]>('/', config);
  data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return data;
}

export async function remove(id: number) {
  const { data } = await client.delete<APIDeleteResponse>(`/${id}`, config);
  return data;
}
