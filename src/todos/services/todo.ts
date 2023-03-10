import axios, { AxiosRequestConfig } from 'axios';
import { APIDeleteResponse } from '../../types';
import { APITypeCreateTodo, APITypeUpdateTodo, Itodo } from '../types/todo';

const client = axios.create({
  baseURL: 'http://localhost:3000/api/todos',
});
const config: AxiosRequestConfig = { withCredentials: true };

export interface updateTodoInterface {
  todoToUpdate: APITypeUpdateTodo;
  todoId: number;
}

export async function createOne(todo: APITypeCreateTodo) {
  const { data } = await client.post<Itodo>('/', todo, config);
  return data;
}

export async function updateOne({ todoToUpdate, todoId }: updateTodoInterface) {
  const { data } = await client.put<Itodo>(`/${todoId}`, todoToUpdate, config);
  return data;
}

export async function findAll() {
  const { data } = await client.get<Itodo[]>('/', config);
  data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return data;
}

export async function removeTodo(todo: Itodo) {
  const { data } = await client.delete<APIDeleteResponse>(
    `/${todo.id}`,
    config,
  );
  return data;
}
