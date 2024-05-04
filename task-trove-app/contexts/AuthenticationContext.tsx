import { createContext } from 'react';

import type { User } from '~/model/User';

export type AuthenticationContext = {
  isAuthenticated: boolean;
  isPendingAuthentication: boolean;
  loggedInUser: User | undefined;
  logIn: (accessToken: string) => void;
  logOut: () => void;
  getAccessToken: () => string | null;
};

const AuthContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  isPendingAuthentication: false,
  loggedInUser: undefined,
  logIn: () => {
    console.log('logIn');
  },
  logOut: () => {
    console.log('logOut');
  },
  getAccessToken: () => null,
});

export default AuthContext;
