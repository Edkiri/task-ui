import axios from 'axios';
import { APIDeleteResponse } from '../../types';
import { IList, List, updateListInterface } from '../types/list';

const client = axios.create({
  baseURL: 'http://localhost:3000/list',
});

export async function createOne(list: List) {
  const { data } = await client.post<IList>('/', list);
  return data;
}

export async function updateOne({ id, title }: updateListInterface) {
  const { data } = await client.put<IList>(`/${id}`, {
    title,
  });
  return data;
}

export interface findBySlugInterface {
  slugName: string;
}
export async function getOne({ slugName }: findBySlugInterface) {
  const { data } = await client.get<IList>(`/${slugName}`);
  return data;
}

export async function findAll() {
  const { data } = await client.get<IList[]>('/');
  data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return data;
}

export async function remove(id: number) {
  const { data } = await client.delete<APIDeleteResponse>(`/${id}`);
  return data;
}
