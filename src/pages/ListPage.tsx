import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import TodoList from '../todos/components/TodoList';
import { findAll as findAllTodos } from '../todos/services/todo';
import { findAll as findAllLists } from '../list/services/list';
import NewTodoForm from '../todos/components/NewTodoForm';

function ListPage() {
  const { data: todos } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAllTodos,
  });
  const { data: lists } = useQuery({
    queryKey: ['findAllLists'],
    queryFn: findAllLists,
  });
  const { listSlugName } = useParams();

  const currentList = lists?.find((item) => item.slugName === listSlugName);

  const listTodos = todos?.filter(
    (item) => item.list?.slugName === listSlugName,
  );

  return (
    <>
      <h2 style={{ marginLeft: '1rem' }}>{currentList?.title}</h2>
      <NewTodoForm listId={currentList?.id} />
      <TodoList todos={listTodos} />
    </>
  );
}

export default ListPage;
