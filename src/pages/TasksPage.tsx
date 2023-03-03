import { useQuery } from '@tanstack/react-query';
import TodoList from '../todos/components/TodoList';
import { findAll } from '../todos/services/todo';

function TasksPage() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });

  const tasks = data?.filter((item) => !item.list);

  return (
    <>
      <h2 style={{ marginLeft: '1rem' }}>Tasks</h2>
      <TodoList todos={tasks} />
    </>
  );
}
export default TasksPage;
