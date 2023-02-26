import { List } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import MenuItem from './MenuItem';
import { Link } from 'react-router-dom';

export enum MenuOptions {
  MYDAY = 'My Day',
  IMPORTANT = 'Important',
}

function MenuList() {
  return (
    <nav className="MenuList">
      <List sx={{ zIndex: 1, mt: 1 }}>
        <Link to={'/'}>
          <MenuItem iconEl={<GradeIcon />} title={MenuOptions.MYDAY} />
        </Link>
        <Link to={'/important'}>
          <MenuItem iconEl={<WbSunnyIcon />} title={MenuOptions.IMPORTANT} />
        </Link>
      </List>
    </nav>
  );
}

export default MenuList;
