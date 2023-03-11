import { Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

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

  const expiresDate = todo.expiresOn;
  const today = new Date();
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  let expiresToday = false;
  let expiresTomorrow = false;
  if (expiresDate) {
    expiresToday =
      new Date(expiresDate).toDateString() === today.toDateString();
    expiresTomorrow =
      new Date(expiresDate).toDateString() === tomorrow.toDateString();
  }
  let dueTitle = '';
  if (expiresDate) {
    if (expiresToday) dueTitle = 'Today';
    if (expiresTomorrow) dueTitle = 'Tomorrow';
    if (!expiresToday && !expiresTomorrow) {
      const dueOn = new Date(expiresDate).toLocaleString('en-US', {
        weekday: 'short',
        month: 'long',
        day: 'numeric',
      });
      dueTitle = `Due ${dueOn}`;
    }
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
          lineHeight: '1.5rem',
        }}
      >
        {todo.content}
      </Typography>
      <div className="MetaDataContainer">
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
        {(listName && dueTitle) && (
          <div className="LitleDot"></div>
        )}
        {dueTitle && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <CalendarMonthIcon
              sx={{ color: 'text.secondary', width: '15px', height: 'auto' }}
            />
            <Typography
              variant="caption"
              display="block"
              color={'text.secondary'}
              textAlign={'left'}
              lineHeight={'1rem'}
              fontWeight={200}
            >
              {dueTitle}
            </Typography>
          </div>
        )}
      </div>
    </>
  );
}
export default TodoMeta;
