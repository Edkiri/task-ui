import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Box, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import { createOne } from '../services/todo';
import { APITypeCreateTodo } from '../types/todo';

interface props {
  listId?: number;
}

function NewTodoForm({ listId }: props) {
  const queryClient = useQueryClient();
  const [newTodo, setNewTodo] = useState('');

  const { isLoading, mutate } = useMutation({
    mutationFn: (todoToCreate: APITypeCreateTodo) => createOne(todoToCreate),
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
    const todoToCreate: APITypeCreateTodo = {
      content: newTodo,
      important: false,
      today: true,
    };
    if (listId) {
      todoToCreate.listId = listId;
      todoToCreate.today = false;
    }
    mutate(todoToCreate);
  };

  return (
    <form onSubmit={formSubmited} style={{ marginBottom: '1rem' }}>
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
