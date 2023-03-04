import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { updateOne, updateTodoInterface } from '../services/todo';
import { Itodo } from '../types/todo';
import { FocusEvent, useCallback, useEffect, useState } from 'react';

interface props {
  todo: Itodo | null;
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

  useEffect(() => {
    const textArea =
      document.querySelector<HTMLTextAreaElement>('.ContentInput');
    const contentLength = textArea?.textLength;
    if (!contentLength) return;
    const initialHeight = Math.ceil(contentLength / 20);
    textArea.style.height = `${initialHeight * 24 + 32}px`;
    textArea?.addEventListener('keyup', (e: any) => {
      textArea.style.height = `${24 + 32}px`;
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
    <div className="TodoDetailsSidebar">
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
        <div className="TodoDetailContent"></div>
      </div>
      <button onClick={hideSidebar}>
        <CloseIcon sx={{ width: 50 }} />
      </button>
    </div>
  );
}
