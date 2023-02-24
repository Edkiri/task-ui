import { List } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import '../styles/MenuList.css';
import MenuItem from './MenuItem';
import { Link } from 'react-router-dom';

export enum MenuOptions {
  MYDAY = 'My Day',
  IMPORTANT = 'Important',
}

interface MenuListProps {
  selectedOption: MenuOptions;
  selectOption: (option: MenuOptions) => void;
}

function MenuList({ selectedOption, selectOption }: MenuListProps) {
  return (
    <nav className="MenuList">
      <List sx={{ zIndex: 1, mt: 1 }}>
        <Link to={'/'}>
          <MenuItem
            iconEl={<GradeIcon />}
            title={MenuOptions.MYDAY}
            selectedOption={selectedOption}
            selectOption={selectOption}
          />
        </Link>
        <Link to={'/important'}>
          <MenuItem
            iconEl={<WbSunnyIcon />}
            title={MenuOptions.IMPORTANT}
            selectedOption={selectedOption}
            selectOption={selectOption}
          />
        </Link>
      </List>
    </nav>
  );
}

export default MenuList;
