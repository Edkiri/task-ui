import { TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

import '../List.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { List } from '../types/list';
import { createOne } from '../services/list';

function CreateListForm() {
  const queryClient = useQueryClient();
  const [newList, setNewList] = useState('');

  const { isLoading, mutate } = useMutation({
    mutationFn: (listToCreate: List) => createOne(listToCreate),
    onSuccess: () => {
      setNewList('');
      queryClient.invalidateQueries(['findAllLists']);
    },
  });

  const listChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewList(e.currentTarget.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newList.trim() || isLoading) return;
    mutate({ title: newList });
  };

  return (
    <form className="CreateListForm" onSubmit={handleSubmit}>
      <TextField
        id="filled-basic"
        label="New list"
        variant="filled"
        size="small"
        value={newList}
        onChange={listChanged}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        <AddIcon />
      </button>
    </form>
  );
}

export default CreateListForm;
