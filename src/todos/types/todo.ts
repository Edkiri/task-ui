import { List } from '../../list/types/list';

export type Todo = {
  content: string;
  done?: boolean;
  important?: boolean;
};

export type Itodo = Todo & {
  id: number;
  createdAt: string;
  list: List;
};
