import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import TodoList from '../todos/components/TodoList';
import { findAll as findAllTodos } from '../todos/services/todo';
import { findAll as findAllLists } from '../list/services/list';
import ListHeader from '../list/components/ListHeader';
import NewTodoForm from '../todos/components/NewTodoForm';

import '../list/List.css';
import { IList } from '../list/types/list';

function ListPage() {
  const { listSlugName } = useParams();
  const [currentList, setCurrentList] = useState<IList | undefined>();

  const { data: lists } = useQuery({
    queryKey: ['findAllLists'],
    queryFn: findAllLists,
  });

  useEffect(() => {
    setCurrentList(lists?.find((item) => item.slugName === listSlugName));
  }, [listSlugName, lists]);

  console.log(currentList);

  const { data: todos } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAllTodos,
  });

  const listTodos = todos?.filter(
    (item) => item.list?.slugName === currentList?.slugName,
  );

  return (
    <>
      {currentList && <ListHeader list={currentList} />}
      <NewTodoForm listId={currentList?.id} />
      <TodoList todos={listTodos} />
    </>
  );
}

export default ListPage;
