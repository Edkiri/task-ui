import { PropsWithChildren, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MyDay from './pages/MyDay';
import NotFound from './pages/NotFound';
import { AuthContext } from './user/AuthContext';

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
import { AuthenticatedRoute } from './user/AuthenticatedRoute';
import { User } from './user/types';
import AccountCreatedPage from './pages/AccountCreated';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

type Props = {
  user?: User | null | undefined;
  setUser: React.Dispatch<React.SetStateAction<User | null | undefined>>;
};

function AppWithProviders({
  children,
  user,
  setUser,
}: PropsWithChildren & Props) {
  return (
    <MenuProvider>
      <AuthContext.Provider value={{ user, updateAuthUser: setUser }}>
        {children}
      </AuthContext.Provider>
    </MenuProvider>
  );
}

export function App() {
  const [user, setUser] = useState<User | null | undefined>();
  return (
    <AppWithProviders user={user} setUser={setUser}>
      <>
        <Header />
        <Container maxWidth="md">
          <Routes>
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/account-created" element={<AccountCreatedPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/"
              element={<AuthenticatedRoute children={<MyDay />} />}
            />
            <Route
              path="/important"
              element={<AuthenticatedRoute children={<Important />} />}
            />
            <Route
              path="/tasks"
              element={<AuthenticatedRoute children={<TasksPage />} />}
            />
            <Route
              path="/list/:listSlugName"
              element={<AuthenticatedRoute children={<ListPage />} />}
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Container>
      </>
    </AppWithProviders>
  );
}

const queryClient = new QueryClient();

export function WrappedApp() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={darkTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}
