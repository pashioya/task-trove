import { createContext } from 'react';

import { User } from '~/model/User';

export interface AuthenticationContext {
  isAuthenticated: boolean;
  isPendingAuthentication: boolean;
  loggedInUser: User | undefined;
  setTempCode: (tempCode: string) => void;
  setStorageKey: (storageKey: string) => void;
  logIn: (accessToken: string) => void;
  logOut: () => void;
  getAccessToken: () => string | null;
  getStorageKey: () => string | null;
  getTempCode: () => string | null;
}

const AuthContext = createContext<AuthenticationContext>({
  isAuthenticated: false,
  isPendingAuthentication: false,
  loggedInUser: undefined,
  setTempCode: () => {},
  setStorageKey: () => {},
  logIn: () => {},
  logOut: () => {},
  getAccessToken: () => null,
  getStorageKey: () => null,
  getTempCode: () => null,
});

export default AuthContext;
