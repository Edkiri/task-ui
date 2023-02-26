import React, { useContext } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MenuOptions } from './MenuList';
import { MenuContext } from '../context/MenuContext';

interface MenuItemProps {
  iconEl: React.ReactNode;
  title: MenuOptions;
}

function MenuItem({ title, iconEl }: MenuItemProps) {
  const { selectOption, optionSelected } = useContext(MenuContext);

  const handleClick = () => {
    selectOption(title);
  };

  return (
    <ListItem
      sx={{
        padding: '0px 0px',
        '&:hover': {
          backgroundColor: `${optionSelected != title && 'action.hover'}`,
        },
        backgroundColor: `${
          optionSelected == title && 'rgba(255, 255, 255, 0.3)'
        }`,
      }}
    >
      <ListItemButton sx={{ padding: '12px 20px' }} onClick={handleClick}>
        <ListItemIcon>{iconEl}</ListItemIcon>
        <ListItemText primary={title} />
      </ListItemButton>
    </ListItem>
  );
}

export default MenuItem;
