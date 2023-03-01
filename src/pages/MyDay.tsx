import { useQuery } from '@tanstack/react-query';
import NewTodoForm from '../todos/components/NewTodoForm';
import TodoList from '../todos/components/TodoList';
import { findAll } from '../todos/services/todo';

function MyDay() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });
  const todos = data?.filter((item) => item.today);
  return (
    <>
      <NewTodoForm />
      <TodoList todos={todos} />
    </>
  );
}

export default MyDay;
