import { IList } from '../../list/types/list';

export type Itodo = {
  content: string;
  id: number;
  createdAt: string;
  done?: boolean;
  important?: boolean;
  today?: boolean;
  list: IList;
};

export type APITypeCreateTodo = {
  content: string;
  today?: boolean;
  important?: boolean;
  listId?: number;
};

export type APITypeUpdateTodo = {
  content?: string;
  today?: boolean;
  important?: boolean;
  done?: boolean;
  listId?: number;
};
