import { useRef } from 'react';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';

import useOnClickOutside from '../../hooks/useOnClickOutside';

interface props {
  deleteList: () => void;
  closeListOptions: () => void;
  editListTitle: () => void;
}

function ListOptions({ deleteList, closeListOptions, editListTitle }: props) {
  const optionsMenuRef = useRef<HTMLUListElement | null>(null);
  useOnClickOutside(optionsMenuRef, closeListOptions);
  return (
    <ul ref={optionsMenuRef} className="ListOptionsMenu">
      <li>
        <button onClick={editListTitle}>
          <EditIcon />
          <span>Edit list title</span>
        </button>
      </li>
      <li>
        <button style={{ color: '#f1707b' }} onClick={deleteList}>
          <DeleteForeverIcon />
          <span>Delete list</span>
        </button>
      </li>
    </ul>
  );
}

export default ListOptions;
