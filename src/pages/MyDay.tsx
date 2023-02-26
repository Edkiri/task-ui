import { useQuery } from '@tanstack/react-query';
import NewTodoForm from '../todos/components/NewTodoForm';
import TodoList from '../todos/components/TodoList';
import { findAll } from '../todos/services/api';

function MyDay() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });
  return (
    <>
      <NewTodoForm></NewTodoForm>
      <TodoList todos={data} />
    </>
  );
}

export default MyDay;
