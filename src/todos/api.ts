import axios from 'axios';
import { APIDeleteResponse, Todo, TodoWithId } from './types';

const client = axios.create({
  baseURL: 'http://localhost:3000/todos',
});

export async function createOne(todo: Todo) {
  const { data } = await client.post<TodoWithId>('/', todo);
  return data;
}

export async function toggleCheck(todo: TodoWithId) {
  const { data } = await client.put<TodoWithId>(`/${todo.id}`, {
    done: todo.done,
  });
  return data;
}

export async function findAll() {
  const { data } = await client.get<TodoWithId[]>('/');
  data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return data;
}

export async function removeTodo(todo: TodoWithId) {
  const { data } = await client.delete<APIDeleteResponse>(`/${todo.id}`);
  return data;
}
