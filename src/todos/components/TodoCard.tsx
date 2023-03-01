import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { Itodo } from '../types/todo';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOne, updateTodoInterface } from '../services/todo';
import {
  IconButton,
  ListItem,
  ListItemButton,
  Typography,
} from '@mui/material';

import '../styles/TodoCard.css';
import TodoMeta from './TodoMeta';
import { useState } from 'react';
import OptionsMenu from './OptionsMenu';

export interface TodoCardProps {
  todo: Itodo;
  openMenuOptions: (e: React.MouseEvent<HTMLDivElement | MouseEvent>) => void;
}

function TodoCard({ todo, openMenuOptions }: TodoCardProps) {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (playload: updateTodoInterface) => updateOne(playload),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllTodos']);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoadingUpdate) return;
    const updatedTodo = { ...todo, done: e.currentTarget.checked };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoadingUpdate) return;
    const updatedTodo = { ...todo, important: !todo.important };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const labelId = `checkbox-todo-${todo.id}`;
  return (
    <>
      <ListItemButton
        sx={{ padding: 0 }}
        onContextMenu={(e) => openMenuOptions(e)}
      >
        <ListItem className="TodoCardLi" sx={{ padding: '4px 16px' }}>
          <div className="TodoCheckBox">
            <Checkbox
              edge="start"
              checked={todo.done}
              disabled={isLoadingUpdate}
              onChange={handleChange}
            />
          </div>
          <TodoMeta todo={todo} />
          <IconButton onClick={handleFav} edge="end" aria-label="fav/todo">
            {todo.important ? (
              <StarIcon sx={{ color: 'primary.main' }} />
            ) : (
              <StarBorderIcon sx={{ color: 'primary.main' }} />
            )}
          </IconButton>
        </ListItem>
      </ListItemButton>
    </>
  );
}

export default TodoCard;
