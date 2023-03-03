import { useQuery } from '@tanstack/react-query';
import TodoList from '../todos/components/TodoList';
import { findAll } from '../todos/services/todo';

function Important() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });

  const importantTodos = data?.filter((item) => item.important);

  return (
    <>
      <h2 style={{ marginLeft: '1rem' }}>Important</h2>
      <TodoList todos={importantTodos} />
    </>
  );
}

export default Important;
