import { createContext } from 'react';

import type { User } from '~/model/User';

export type AuthenticationContext = {
  isAuthenticated: boolean;
  loggedInUser: User | undefined;
  logIn: (accessToken: string) => void;
  logOut: () => void;
};

const AuthContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  loggedInUser: undefined,
  logIn: () => {
    console.log('logIn not implemented');
  },
  logOut: () => {
    console.log('logOut not implemented');
  },
});

export default AuthContext;
