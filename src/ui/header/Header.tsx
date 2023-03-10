import { AppBar, Box, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { MenuContext } from './context/MenuContext';
import MenuList from './components/MenuList';

import './Header.css';

function Header() {
  const { isOpen, toggleMenu } = useContext(MenuContext);

  const path = window.location.pathname;
  const displayMenu = path !== '/signup' && path !== '/login';

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                mr: 2,
                zIndex: 3,
                display: `${displayMenu ? 'block' : 'none'}`,
              }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Goals
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      {isOpen && <MenuList />}
    </>
  );
}

export default Header;
