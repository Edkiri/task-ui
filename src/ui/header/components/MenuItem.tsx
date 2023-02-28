import { useContext } from 'react';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { MenuContext } from '../context/MenuContext';
import useMenuItem from '../hooks/useMenuItem';
import { Link } from 'react-router-dom';

interface MenuItemProps {
  title: string;
  url: string;
  iconEl: React.ReactNode;
}

function MenuItem({ title, url, iconEl }: MenuItemProps) {
  const { selectMenuTitle, menuTitleSelected } = useContext(MenuContext);
  const { quantity } = useMenuItem({ title });

  const handleClick = () => {
    selectMenuTitle(title);
  };

  return (
    <Link to={url}>
      <ListItem
        sx={{
          padding: '0px 0px',
          '&:hover': {
            backgroundColor: `${menuTitleSelected != title && 'action.hover'}`,
          },
          backgroundColor: `${
            menuTitleSelected == title && 'rgba(255, 255, 255, 0.3)'
          }`,
          borderLeft: `${menuTitleSelected == title && '3px solid #90caf9'}`,
        }}
      >
        <ListItemButton sx={{ padding: '12px 20px' }} onClick={handleClick}>
          <ListItemIcon>{iconEl}</ListItemIcon>
          <ListItemText primary={title} />
          <span>{quantity}</span>
        </ListItemButton>
      </ListItem>
    </Link>
  );
}

export default MenuItem;
