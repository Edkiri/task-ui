import { List } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import WbSunnyIcon from '@mui/icons-material/WbSunny';

import MenuItem from './MenuItem';
import { Link } from 'react-router-dom';
import BackgroundLayout from '../../background-layout/BackgroundLayout';
import { useContext } from 'react';
import { MenuContext } from '../context/MenuContext';

export enum MenuOptions {
  MYDAY = 'My Day',
  IMPORTANT = 'Important',
}

function MenuList() {
  const { closeMenu } = useContext(MenuContext);
  return (
    <>
      <nav className="MenuList">
        <List sx={{ zIndex: 1, mt: 1 }}>
          <Link to={'/'}>
            <MenuItem iconEl={<WbSunnyIcon />} title={MenuOptions.MYDAY} />
          </Link>
          <Link to={'/important'}>
            <MenuItem iconEl={<GradeIcon />} title={MenuOptions.IMPORTANT} />
          </Link>
        </List>
      </nav>
      <BackgroundLayout handleClick={closeMenu} />
    </>
  );
}

export default MenuList;
