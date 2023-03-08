import { useRef, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CloseIcon from '@mui/icons-material/Close';
import TodayIcon from '@mui/icons-material/Today';

import { Itodo } from '../types/todo';
import useOnClickOutside from '../../hooks/useOnClickOutside';
import { updateOne, updateTodoInterface } from '../services/todo';
import DataPicker from '../../ui/data-picker/DataPicker';

interface props {
  todo: Itodo;
  selectTodo: (todo: Itodo | null) => void;
}

export default function DateOptions({ todo, selectTodo }: props) {
  const [showOptions, setShowOptions] = useState(false);
  const sideOptionsList = useRef<HTMLUListElement | null>(null);
  const queryClient = useQueryClient();

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
  let dueTitle = 'Add due date';
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

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (playload: updateTodoInterface) => updateOne(playload),
    onSuccess: (data) => {
      queryClient.invalidateQueries(['findAllTodos']);
      selectTodo(data);
      setShowOptions(false);
    },
  });

  const dueToToday = () => {
    if (isLoadingUpdate) return;
    if (expiresToday) {
      setShowOptions(false);
      return;
    }
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: { today: true, expiresOn: today },
    });
  };

  const dueToTomorrow = () => {
    if (isLoadingUpdate) return;
    if (expiresTomorrow) {
      setShowOptions(false);
      return;
    }
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: { today: true, expiresOn: tomorrow },
    });
  };

  const removeDueDate = () => {
    if (isLoadingUpdate || !expiresDate) return;
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: { expiresOn: null },
    });
  };

  const handleClick = () => setShowOptions(!showOptions);

  const hideOptions = () => {
    setShowOptions(false);
  };

  useOnClickOutside(sideOptionsList, hideOptions);

  const handleDatePicker = (date: Date) => {
    if (isLoadingUpdate) return;
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: { expiresOn: date },
    });
  };

  return (
    <div className="DateOptionsContainer">
      <div className="DueTodayButtonContainer">
        <button
          onClick={handleClick}
          style={{ color: `${expiresDate ? '#84b7e1' : 'white'}` }}
        >
          <CalendarMonthIcon />
          <span>{dueTitle}</span>
        </button>
        <button
          onClick={removeDueDate}
          className={`DeleteDueDateButton ${expiresDate ? 'expires' : ''}`}
        >
          <CloseIcon />
        </button>
      </div>
      {showOptions && (
        <ul className="DateOptionsList" ref={sideOptionsList}>
          <h4>Due</h4>
          <div className="DividerContainer">
            <hr />
          </div>
          <li>
            <button onClick={dueToToday}>
              <TodayIcon sx={{ fontSize: '1.2rem' }} />
              <span>Today</span>
            </button>
          </li>
          <li>
            <button onClick={dueToTomorrow}>
              <CalendarMonthIcon sx={{ fontSize: '1.2rem' }} />
              <span>Tomorrow</span>
            </button>
          </li>
          <div className="DividerContainer">
            <hr />
          </div>
          <li>
            <div className="DataPickerButtonContainer">
              <DataPicker onSave={handleDatePicker} />
            </div>
          </li>
        </ul>
      )}
    </div>
  );
}
