import List from '@mui/material/List';
import { useQuery } from '@tanstack/react-query';
import { findAll } from './api';
import TodoCard from './TodoCard';

function TodoList() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      {data?.map((todo) => {
        return <TodoCard key={`todo-${todo.id}`} todo={todo} />;
      })}
    </List>
  );
}

export default TodoList;
