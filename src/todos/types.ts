export type Todo = {
  content: string;
  done: boolean;
};

export type TodoWithId = Todo & {
  id: number;
  createdAt: string;
};

export type APIDeleteResponse = {
  message: string;
  statusCode: number;
};
