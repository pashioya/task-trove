import { Redirect } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { ReactNode, useCallback, useEffect, useState } from 'react';

import AuthenticationContext from './AuthenticationContext';

interface IWithChildren {
  children: ReactNode;
}

const AuthenticationContextProvider = ({ children }: IWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser] = useState(undefined);
  // const logout = useCallback(() => {
  //   // delete access token from secure store
  //   SecureStore.deleteItemAsync('accessToken');
  // }, []);
  const logout = () => {
    console.log('Logout');
  };

  // Check authentication before rendering the provider
  const checkAuthentication = async () => {
    const accessToken = await SecureStore.getItemAsync('accessToken');
    setIsAuthenticated(!!accessToken);
  };

  checkAuthentication(); // Call the function to check
  return (
    <AuthenticationContext.Provider value={{ loggedInUser, isAuthenticated, logout }}>
      {
        //TODO: If not authenticated, redirect to /Login
        children
      }
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
