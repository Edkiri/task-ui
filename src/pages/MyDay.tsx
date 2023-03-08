import { useQuery } from '@tanstack/react-query';
import NewTodoForm from '../todos/components/NewTodoForm';
import TodoList from '../todos/components/TodoList';
import { findAll } from '../todos/services/todo';

function MyDay() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });

  const todos = data?.filter((item) => {
    if (item.today) return item;
    let expiresToday = false;
    if (item.expiresOn) {
      expiresToday =
        new Date(item.expiresOn).toDateString() === new Date().toDateString();
    }
    if (expiresToday) return item;
  });

  return (
    <>
      <h2 style={{ marginLeft: '1rem' }}>My Day</h2>
      <NewTodoForm />
      <TodoList todos={todos} />
    </>
  );
}

export default MyDay;
