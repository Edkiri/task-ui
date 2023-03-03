import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { Itodo } from '../types/todo';

interface props {
  todo: Itodo;
  addToMayDay: () => void;
  removeFromMyDay: () => void;
  deleleTodo: () => void;
}

export default function TodoOptionsMenu({
  todo,
  addToMayDay,
  removeFromMyDay,
  deleleTodo,
}: props) {
  return (
    <ul className="TodoOptionsMenu">
      <li>
        {todo.today ? (
          <button onClick={removeFromMyDay}>
            <WbSunnyIcon />
            <span>Remove from My Day</span>
          </button>
        ) : (
          <button onClick={addToMayDay}>
            <WbSunnyIcon />
            <span>Add to My Day</span>
          </button>
        )}
        <div className="DividerContainer">
          <hr />
        </div>
        <button style={{ color: '#f1707b' }} onClick={deleleTodo}>
          <DeleteForeverIcon />
          <span>Delete todo</span>
        </button>
      </li>
    </ul>
  );
}
