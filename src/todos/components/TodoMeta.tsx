import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';

import { Itodo } from '../types/todo';

interface props {
  todo: Itodo;
}

function TodoMeta({ todo }: props) {
  const { listSlugName } = useParams();

  let listName = '';

  if (!listSlugName && todo.list) {
    listName = todo.list.title;
  }

  return (
    <>
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          textDecorationLine: `${todo.done && 'line-through'}`,
          opacity: `${todo.done && '.7'}`,
          margin: 0,
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          lineHeight: '1.5rem'
        }}
      >
        {todo.content}
      </Typography>
      {listName && (
        <Typography
          variant="caption"
          display="block"
          color={'text.secondary'}
          textAlign={'left'}
          lineHeight={'1rem'}
          fontWeight={200}
        >
          {listName}
        </Typography>
      )}
    </>
  );
}
export default TodoMeta;
