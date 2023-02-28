import { IList, List } from '../../list/types/list';

export type Todo = {
  content: string;
  done?: boolean;
  important?: boolean;
  listId?: number;
};

export type Itodo = Todo & {
  id: number;
  createdAt: string;
  list: IList;
};
