import NewTodoForm from '../todos/NewTodoForm';
import TodoList from '../todos/TodoList';

function Home() {
  return (
    <>
      <NewTodoForm></NewTodoForm>
      <TodoList />
    </>
  );
}

export default Home;
