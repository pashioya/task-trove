import { createContext } from 'react';

import { User } from '~/model/User';

export interface AuthenticationContext {
  isAuthenticated: boolean;
  loggedInUser: User | undefined;
  logIn: (accessToken: string) => void;
  logOut: () => void;
  getAccessToken: () => string | null;
}

const AuthContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  loggedInUser: undefined,
  logIn: () => {},
  logOut: () => {},
  getAccessToken: () => null,
});

export default AuthContext;
