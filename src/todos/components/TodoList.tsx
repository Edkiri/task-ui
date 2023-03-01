import { useState } from 'react';
import List from '@mui/material/List';

import { Itodo } from '../types/todo';

import HeaderCompletedList from './HeaderCompletedList';
import TodoCard from './TodoCard';
import OptionsMenu from './OptionsMenu';

import '../Todos.css';

interface props {
  todos: Itodo[] | undefined;
}

const initialState: { show: boolean; x: number; y: number } = {
  show: false,
  x: 0,
  y: 0,
};

function TodoList({ todos }: props) {
  const [completedIsOpen, setCompletedIsOpen] = useState(false);
  const [optionsMenu, setOptionsMenu] = useState(initialState);

  const toggleCompletedList = () => {
    setCompletedIsOpen((prevState) => {
      return !prevState;
    });
  };

  const handleContextMenu = (
    e: React.MouseEvent<HTMLDivElement | MouseEvent>,
  ) => {
    e.preventDefault();
    const { pageX, pageY } = e;
    setOptionsMenu({ show: true, x: pageX, y: pageY });
  };

  const closeMenuOptions = () => {
    setOptionsMenu(initialState);
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
                openMenuOptions={handleContextMenu}
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
                      openMenuOptions={handleContextMenu}
                    />
                  );
              })}
            </List>
          )}
        </>
      )}
      {optionsMenu.show && (
        <OptionsMenu
          x={optionsMenu.x}
          y={optionsMenu.y}
          closeMenu={closeMenuOptions}
        />
      )}
    </>
  );
}

export default TodoList;
