import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';

import { updateOne, updateTodoInterface } from '../services/todo';
import { Itodo } from '../types/todo';
import { FocusEvent, useEffect, useRef, useState } from 'react';
import useOnClickOutside from '../../hooks/useOnClickOutside';

interface props {
  todo: Itodo;
  selectTodo: (todo: Itodo | null) => void;
  hideSidebar: () => void;
}

export default function TodoDetailsSidebar({
  todo,
  hideSidebar,
  selectTodo,
}: props) {
  const queryClient = useQueryClient();
  const [todoContent, setTodoContent] = useState<string | undefined>(
    todo?.content,
  );
  const createdAt = new Date(todo.createdAt).toLocaleString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  const sideBarRef = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(sideBarRef, hideSidebar);

  const { isLoading: isLoadingUpdate, mutate: mutateUpdate } = useMutation({
    mutationFn: (playload: updateTodoInterface) => updateOne(playload),
    onSuccess: (data) => {
      selectTodo(data);
      queryClient.invalidateQueries(['findAllTodos']);
    },
  });

  const checkboxChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isLoadingUpdate || !todo) return;
    const updatedTodo = { ...todo, done: e.currentTarget.checked };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const contentChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTodoContent(e.currentTarget.value);
  };

  const handleBlur = (e: FocusEvent<HTMLTextAreaElement, Element>) => {
    if (
      isLoadingUpdate ||
      !todo ||
      todo.content === todoContent?.trim() ||
      !todoContent?.trim()
    )
      return;
    const updatedTodo = { ...todo, content: todoContent };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const handleAddToMyDay = () => {
    if (isLoadingUpdate || !todo) return;
    const updatedTodo = { ...todo, today: !todo.today };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  const handleMarkImportant = () => {
    if (isLoadingUpdate || !todo) return;
    const updatedTodo = { ...todo, important: !todo.important };
    mutateUpdate({
      todoId: todo.id,
      todoToUpdate: updatedTodo,
    });
  };

  useEffect(() => {
    const textArea =
      document.querySelector<HTMLTextAreaElement>('.ContentInput');
    const contentLength = textArea?.textLength;
    if (!contentLength) return;
    const initialHeight = Math.ceil(contentLength / 20);
    if (contentLength < 20) {
      textArea.style.height = `${24 + 16}px`;
    } else {
      textArea.style.height = `${initialHeight * 24 + 16}px`;
    }
    textArea?.addEventListener('keyup', (e: any) => {
      textArea.style.height = `${24 + 16}px`;
      let scHeight = e.target.scrollHeight;
      textArea.style.height = `${scHeight}px`;
    });
    textArea?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        textArea.blur();
      }
    });
  }, []);

  return (
    <div className="TodoDetailsSidebar" ref={sideBarRef}>
      <div className="TodoDetailtContainer">
        <div className="HeaderDetailsSidebar">
          <Checkbox
            checked={todo?.done}
            disabled={isLoadingUpdate}
            onChange={checkboxChanged}
            sx={{ maxWidth: 30 }}
          />
          <textarea
            spellCheck="false"
            className="ContentInput"
            onChange={contentChanged}
            value={todoContent}
            onBlur={handleBlur}
          />
        </div>
        <div className="DividerContainer">
          <hr />
        </div>
        <div className="TodoDetailContent">
          <button
            onClick={handleAddToMyDay}
            style={{
              color: `${todo?.today ? '#84b7e1' : 'white'}`,
            }}
          >
            <WbSunnyIcon />
            <span>{todo?.today ? 'Added to My day' : 'Add to My Day'}</span>
          </button>
          <button onClick={handleMarkImportant} style={{ color: 'white' }}>
            {todo?.important ? (
              <StarIcon sx={{ color: 'primary.main' }} />
            ) : (
              <StarBorderIcon sx={{ color: 'white' }} />
            )}
            <span>
              {todo?.important ? 'Marked as important' : 'Mark as important'}
            </span>
          </button>
        </div>
      </div>
      <div className="FooterSidebar">
        <button onClick={hideSidebar}>
          <CloseIcon sx={{ width: 20 }} />
        </button>
        <p style={{ fontSize: '0.9rem', width: '100%', textAlign: 'center' }}>
          Created on {createdAt}
        </p>
      </div>
    </div>
  );
}
