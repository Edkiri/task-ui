import { AppBar, Box, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useContext } from 'react';
import { MenuContext } from './context/MenuContext';
import MenuList from './components/MenuList';

import './Header.css';
import UserProfile from './components/UserProfile';
import { useAuth } from '../../user/useAuth';

function Header() {
  const { isOpen, toggleMenu } = useContext(MenuContext);
  const { user } = useAuth();

  const path = window.location.pathname;
  const displayMenu = path !== '/signup' && path !== '/login';

  return (
    <div className="Header">
      <AppBar
        position="static"
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          flexDirection: 'row',
          padding: '0px 1rem',
        }}
      >
        <Toolbar sx={{ padding: 0, gap: '0.5rem' }}>
          {user && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{
                zIndex: 3,
                display: `${displayMenu ? 'block' : 'none'}`,
              }}
              onClick={toggleMenu}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Goals
          </Typography>
        </Toolbar>
        <UserProfile />
      </AppBar>
      {isOpen && <MenuList />}
    </div>
  );
}

export default Header;
