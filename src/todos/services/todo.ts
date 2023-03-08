import axios from 'axios';
import { APIDeleteResponse } from '../../types';
import { APITypeCreateTodo, APITypeUpdateTodo, Itodo } from '../types/todo';

const client = axios.create({
  baseURL: 'http://localhost:3000/todos',
});

export interface updateTodoInterface {
  todoToUpdate: APITypeUpdateTodo;
  todoId: number;
}

export async function createOne(todo: APITypeCreateTodo) {
  const { data } = await client.post<Itodo>('/', todo);
  return data;
}

export async function updateOne({ todoToUpdate, todoId }: updateTodoInterface) {
  const { data } = await client.put<Itodo>(`/${todoId}`, todoToUpdate);
  return data;
}

export async function findAll() {
  const { data } = await client.get<Itodo[]>('/');
  data.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
  return data;
}

export async function removeTodo(todo: Itodo) {
  const { data } = await client.delete<APIDeleteResponse>(`/${todo.id}`);
  return data;
}
