import { Typography } from '@mui/material';

import { Itodo } from '../types/todo';

interface props {
  todo: Itodo;
}

function TodoMeta({ todo }: props) {
  return (
    <div className="TodoCardContent">
      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{
          textDecorationLine: `${todo.done && 'line-through'}`,
          opacity: `${todo.done && '.7'}`,
          margin: 0,
          fontWeight: 700,
        }}
      >
        {todo.content}
      </Typography>
      <div className="metaData">
        <Typography
          variant="caption"
          display="block"
          gutterBottom
          color={'text.secondary'}
        >
          List name
        </Typography>
      </div>
    </div>
  );
}
export default TodoMeta;
