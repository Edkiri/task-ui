import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { remove, updateOne } from '../services/list';
import ListOptions from './ListOptions';
import { IList, updateListInterface } from '../types/list';

interface props {
  list: IList;
}
export default function ListHeader({ list }: props) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (payload: updateListInterface) => updateOne(payload),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries(['findAllLists']);
      await queryClient.invalidateQueries(['findAllTodos']);
      navigate(`/list/${data.slugName}`);
    },
  });

  const { isLoading: isLoadingDelete, mutate: mutateDelete } = useMutation({
    mutationFn: (id: number) => remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries(['findAllLists']);
      queryClient.invalidateQueries(['findAllTodos']);
      navigate('');
    },
  });

  const toggleListOptions = () => {
    setShowOptions(!showOptions);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const updateListTitle = () => {
    if (isLoadingUpdate || !title?.trim() || list.title === title.trim())
      return;
    mutateUpdate({ id: list.id, title });
    setIsEditing(false);
  };

  const handleBlur = () => {
    updateListTitle();
    setIsEditing(false);
  };

  const handleEditListTitle = async () => {
    setShowOptions(false);
    setIsEditing(true);
    setTitle(list.title);
    const input = await document.querySelector<HTMLInputElement>(
      '.EditTitleInput',
    );
    input?.focus();
  };

  const handleDelete = () => {
    if (isLoadingDelete) return;
    mutateDelete(list.id);
  };

  useEffect(() => {
    const input =
      document.querySelector<HTMLTextAreaElement>('.EditTitleInput');
    input?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        input.blur();
      }
    });
  }, []);

  return (
    <>
      <input
        type="text"
        value={title}
        onChange={handleChange}
        onBlur={handleBlur}
        className="EditTitleInput"
        style={{ display: `${isEditing ? 'block' : 'none'}` }}
      />
      <h2
        className="ListTitle"
        style={{ display: `${isEditing ? 'none' : 'flex'}` }}
      >
        <FormatListBulletedIcon />
        {list.title}
        <div className="OptionsMenuIconContainer">
          <MoreHorizIcon
            className="OptionsListIcon"
            fontSize="large"
            onClick={toggleListOptions}
          />
          {showOptions && (
            <ListOptions
              deleteList={handleDelete}
              editListTitle={handleEditListTitle}
              closeListOptions={() => setShowOptions(false)}
            />
          )}
        </div>
      </h2>
    </>
  );
}
