import React from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MenuOptions } from './MenuList';

interface MenuItemProps {
  iconEl: React.ReactNode;
  title: MenuOptions;
  selectedOption: MenuOptions;
  selectOption: (option: MenuOptions) => void;
}

function MenuItem({
  title,
  iconEl,
  selectedOption,
  selectOption,
}: MenuItemProps) {
  const handleClick = () => {
    selectOption(title);
  };

  return (
    <ListItem
      sx={{
        padding: '0px 0px',
        '&:hover': {
          backgroundColor: `${selectedOption != title && 'action.hover'}`,
        },
        backgroundColor: `${
          selectedOption == title && 'rgba(255, 255, 255, 0.3)'
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
