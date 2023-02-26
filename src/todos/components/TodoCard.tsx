import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { Itodo } from '../types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateOne } from '../services/api';
import { IconButton, ListItem } from '@mui/material';

export interface TodoCardProps {
  todo: Itodo;
}

function TodoCard({ todo }: TodoCardProps) {
  const queryClient = useQueryClient();

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (todo: Itodo) => updateOne(todo),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllTodos']);
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoadingUpdate) return;
    const updatedTodo = { ...todo, done: e.currentTarget.checked };
    mutateUpdate(updatedTodo);
  };

  const handleFav = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isLoadingUpdate) return;
    const updatedTodo = { ...todo, important: !todo.important };
    mutateUpdate(updatedTodo);
  };

  const labelId = `checkbox-todo-${todo.id}`;
  return (
    <ListItem
      dense
      secondaryAction={
        <IconButton onClick={handleFav} edge="end" aria-label="delete/todo">
          {todo.important ? <StarIcon sx={{ color: 'primary.main'}} /> : <StarBorderIcon sx={{ color: 'primary.main'}} />}
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
