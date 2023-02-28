import axios from 'axios';
import { APIDeleteResponse } from '../../types';
import { IList, List } from '../types/list';

const client = axios.create({
  baseURL: 'http://localhost:3000/list',
});

export async function createOne(list: List) {
  const { data } = await client.post<IList>('/', list);
  return data;
}

export async function updateOne(list: IList) {
  const { data } = await client.put<IList>(`/${list.id}`, {
    title: list.title,
  });
  return data;
}

export async function findAll() {
  const { data } = await client.get<IList[]>('/');
  data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return data;
}

export async function remove(list: IList) {
  const { data } = await client.delete<APIDeleteResponse>(`/${list.id}`);
  return data;
}
