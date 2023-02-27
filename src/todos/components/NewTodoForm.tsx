import { Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createOne } from '../services/api';
import { Todo } from '../types/todo';

function NewTodoForm() {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');

  const { isLoading, mutate } = useMutation({
    mutationFn: (todoToCreate: Todo) => createOne(todoToCreate),
    onSuccess: () => {
      setNewTodo('');
      queryClient.invalidateQueries(['findAllTodos']);
    },
  });

  const todoChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.currentTarget.value);
  };

  const formSubmited = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newTodo.trim()) return;
    mutate({ content: newTodo, done: false, important: false });
  };

  return (
    <form onSubmit={formSubmited}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="newTodo">Add a task</InputLabel>
          <OutlinedInput
            id="newTodo"
            name="newTodo"
            value={newTodo}
            onChange={todoChanged}
            label="New Todo"
            disabled={isLoading}
          />
        </FormControl>
        <LoadingButton
          type="submit"
          loading={isLoading}
          variant="outlined"
          sx={{ minWidth: 70, ml: '0.3rem' }}
        >
          Add
        </LoadingButton>
      </Box>
    </form>
  );
}

export default NewTodoForm;
