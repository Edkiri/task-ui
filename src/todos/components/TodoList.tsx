import List from '@mui/material/List';
import { useQuery } from '@tanstack/react-query';
import { findAll } from '../services/api';
import HeaderCompletedList from './HeaderCompletedList';
import TodoCard from './TodoCard';

import '../Todos.css';
import { useState } from 'react';

function TodoList() {
  const { data } = useQuery({
    queryKey: ['findAllTodos'],
    queryFn: findAll,
  });
  const [completedIsOpen, setCompletedIsOpen] = useState(false);

  const toggleCompletedList = () => {
    setCompletedIsOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {data?.map((todo) => {
          if (!todo.done)
            return <TodoCard key={`todo-${todo.id}`} todo={todo} />;
        })}
      </List>
      {data?.some((item) => item.done) && (
        <>
          <HeaderCompletedList
            toggleCompletedList={toggleCompletedList}
            completedIsOpen={completedIsOpen}
          />
          {completedIsOpen && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {data?.map((todo) => {
                if (todo.done)
                  return <TodoCard key={`todo-${todo.id}`} todo={todo} />;
              })}
            </List>
          )}
        </>
      )}
    </>
  );
}

export default TodoList;
