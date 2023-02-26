import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import DeleteIcon from '@mui/icons-material/Delete';

import { Itodo } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toggleCheck, removeTodo } from '../services/api';
import { IconButton, ListItem } from '@mui/material';

export interface TodoCardProps {
  todo: Itodo;
}

function TodoCard({ todo }: TodoCardProps) {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (todo: Itodo) => toggleCheck(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllTodos']);
    },
  });

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation({
    mutationFn: (todo: Itodo) => removeTodo(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllTodos']);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedTodo = { ...todo, done: e.currentTarget.checked };
    mutateUpdate(updatedTodo);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoadingDelete) return;
    mutateDelete(todo);
  };

  const labelId = `checkbox-todo-${todo.id}`;
  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton onClick={handleDelete} edge="end" aria-label="delete/todo">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemIcon>
        <Checkbox
          edge="start"
          checked={todo.done}
          disabled={isLoadingUpdate}
          onChange={handleChange}
        />
      </ListItemIcon>
      <ListItemText
        id={labelId}
        primary={todo.content}
        sx={{
          textDecorationLine: `${todo.done && 'line-through'}`,
          opacity: `${todo.done && '.7'}`,
        }}
      />
    </ListItem>
  );
}

export default TodoCard;
