import { useState } from 'react';
import List from '@mui/material/List';

import { Itodo } from '../types/todo';

import HeaderCompletedList from './HeaderCompletedList';
import TodoDetailsSidebar from './TodoDetailsSidebar';
import TodoCard from './TodoCard';

import '../Todos.css';

interface props {
  todos: Itodo[] | undefined;
}

function TodoList({ todos }: props) {
  const [completedIsOpen, setCompletedIsOpen] = useState(false);
  const [todoSelected, setTodoSelected] = useState<Itodo | null>(null);

  const toggleCompletedList = () => {
    setCompletedIsOpen((prevState) => {
      return !prevState;
    });
  };

  const selectTodo = async (todo: Itodo | null) => {
    await unselectTodo();
    setTodoSelected(todo);
  };

  const unselectTodo = () => {
    setTodoSelected(null);
  };

  return (
    <>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {todos?.map((todo) => {
          if (!todo.done)
            return (
              <TodoCard
                key={`todo-${todo.id}`}
                todo={todo}
                todoSelected={todoSelected}
                selectTodo={selectTodo}
              />
            );
        })}
      </List>
      {todos?.some((item) => item.done) && (
        <>
          <HeaderCompletedList
            toggleCompletedList={toggleCompletedList}
            completedIsOpen={completedIsOpen}
          />
          {completedIsOpen && (
            <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
              {todos?.map((todo) => {
                if (todo.done)
                  return (
                    <TodoCard
                      key={`todo-${todo.id}`}
                      todo={todo}
                      selectTodo={selectTodo}
                      todoSelected={todoSelected}
                    />
                  );
              })}
            </List>
          )}
        </>
      )}
      {todoSelected && (
        <TodoDetailsSidebar
          todo={todoSelected}
          hideSidebar={unselectTodo}
          selectTodo={selectTodo}
        />
      )}
    </>
  );
}

export default TodoList;
