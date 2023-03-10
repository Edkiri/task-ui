import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyDay from './pages/MyDay';
import NotFound from './pages/NotFound';

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Container } from '@mui/system';

import { QueryClientProvider } from '@tanstack/react-query';
import { QueryClient } from '@tanstack/query-core';
import { MenuProvider } from './ui/header/context/MenuContext';
import Header from './ui/header/Header';
import Important from './pages/Important';
import ListPage from './pages/ListPage';
import TasksPage from './pages/TasksPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export function App() {
  return (
    <>
      <Header />
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<MyDay />} />
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/important" element={<Important />} />
          <Route path="/tasks" element={<TasksPage />} />
          <Route path="/list/:listSlugName" element={<ListPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
    </>
  );
}

const queryClient = new QueryClient();

export function WrappedApp() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <MenuProvider>
            <App />
          </MenuProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
