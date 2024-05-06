import { createContext } from 'react';

import type { User } from '~/model/User';

export type AuthenticationContext = {
  isAuthenticated: boolean;
  isPendingAuthentication: boolean;
  loggedInUser: User | undefined;
  logIn: (accessToken: string) => void;
  logOut: () => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  setIsPendingAuthentication: (isPendingAuthentication: boolean) => void;
  getAccessToken: () => string | null;
};

const AuthContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  isPendingAuthentication: false,
  loggedInUser: undefined,
  // ! Disabled because the functions for logIn, logOut are described in the provider
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logIn: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  logOut: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsAuthenticated: () => {},
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsPendingAuthentication: () => {},
  getAccessToken: () => null,
});

export default AuthContext;
