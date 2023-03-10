import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IconButton } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { Itodo } from '../types/todo';
import { removeTodo, updateOne, updateTodoInterface } from '../services/todo';
import TodoMeta from './TodoMeta';

import '../styles/TodoCard.css';
import TodoOptionsMenu from './TodoOptionsMenu';

export interface TodoCardProps {
  todo: Itodo;
  todoSelected: Itodo | null;
  selectTodo: (todo: Itodo | null) => void;
}

function TodoCard({ todo, todoSelected, selectTodo }: TodoCardProps) {
  const queryClient = useQueryClient();
  const [showOptions, setShowOptions] = useState(false);

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (playload: updateTodoInterface) => updateOne(playload),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllTodos']);
      setShowOptions(false);
    },
  });
  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation({
    mutationFn: (todo: Itodo) => removeTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllTodos']);
      setShowOptions(false);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoadingUpdate) return;
    const updatedTodo = { done: e.currentTarget.checked };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const handleFav = () => {
    if (isLoadingUpdate) return;
    const updatedTodo = { important: !todo.important };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const handleAddToMyDay = () => {
    if (isLoadingUpdate) return;
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: { today: true },
    });
  };

  const handleRemoveFromMyDay = () => {
    if (isLoadingUpdate) return;
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: { today: false },
    });
  };

  const handleDeleteTodo = () => {
    if (isLoadingDelete) return;
    mutateDelete(todo);
  };

  const handleOpenTodoDetails = () => {
    selectTodo(todo);
  };

  return (
    <>
      <li
        className={`TodoCard ${todoSelected?.id === todo.id ? 'selected' : ''}`}
      >
        <div className="TodoCardOptions">
          <Checkbox
            edge="start"
            checked={todo.done}
            disabled={isLoadingUpdate}
            onChange={handleChange}
            sx={{ padding: 0, margin: 0 }}
          />
          <IconButton onClick={handleFav} edge="end" sx={{ padding: 0, margin: 0 }}>
            {todo.important ? (
              <StarIcon sx={{ color: 'primary.main' }} />
            ) : (
              <StarBorderIcon sx={{ color: 'primary.main' }} />
            )}
          </IconButton>
        </div>
        <button className="TodoCardContent" onClick={handleOpenTodoDetails}>
          <TodoMeta todo={todo} />
        </button>
        <div className="TodoMenuIcon">
          <div onClick={() => setShowOptions(!showOptions)}>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
          {showOptions && (
            <TodoOptionsMenu
              todo={todo}
              addToMayDay={handleAddToMyDay}
              removeFromMyDay={handleRemoveFromMyDay}
              deleleTodo={handleDeleteTodo}
              closeTodoOptions={() => setShowOptions(false)}
            />
          )}
        </div>
      </li>
    </>
  );
}

export default TodoCard;
