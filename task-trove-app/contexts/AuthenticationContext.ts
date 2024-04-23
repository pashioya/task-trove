import { createContext } from 'react';

export interface AuthenticationContext {
  isAuthenticated: boolean;
  loggedInUser: string | undefined;
  logout: () => void;
}

export default createContext<AuthenticationContext>({
  isAuthenticated: false,
  loggedInUser: undefined,
  logout: () => {},
});
