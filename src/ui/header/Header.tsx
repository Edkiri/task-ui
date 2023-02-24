import { AppBar, Box, Toolbar } from '@mui/material';
import Typography from '@mui/material/Typography';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import useMenu from './menu/useMenu';
import MenuList from './menu/components/MenuList';

function Header() {
  const { isOpen, toggleMenu, selectOption, menuOptionSelected } = useMenu();

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
              sx={{ mr: 2, zIndex: 3 }}
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
      {isOpen && (
        <MenuList
          selectOption={selectOption}
          selectedOption={menuOptionSelected}
        />
      )}
    </>
  );
}

export default Header;
