import * as SecureStore from 'expo-secure-store';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import AuthenticationContext from './AuthenticationContext';

interface IWithChildren {
  children: ReactNode;
}

const AuthenticationContextProvider = ({ children }: IWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser] = useState(undefined);
  const logout = useCallback(() => {
    // delete access token from secure store
    SecureStore.deleteItemAsync('accessToken');
  }, []);

  useEffect(() => {
    const checkAuthentication = async () => {
      const accessToken = await SecureStore.getItemAsync('accessToken');
      setIsAuthenticated(!!accessToken); // Double negation for boolean check
    };
    checkAuthentication();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ loggedInUser, isAuthenticated, logout }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
