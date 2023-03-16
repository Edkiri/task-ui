import { createContext } from 'react';
import { User } from './types';

type AuthContextType = {
  user?: User | null | undefined;
  updateAuthUser: (data: User | null) => void;
};

export const AuthContext = createContext<AuthContextType>({
  updateAuthUser: () => {},
});
