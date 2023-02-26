import NewTodoForm from '../todos/components/NewTodoForm';
import TodoList from '../todos/components/TodoList';

function Home() {
  return (
    <>
      <NewTodoForm></NewTodoForm>
      <TodoList />
    </>
  );
}

export default Home;
