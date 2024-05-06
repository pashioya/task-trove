import { useEffect, useState, type ReactNode } from 'react';

import AuthenticationContext from './AuthenticationContext';

import { useStorageState } from '~/hooks/useStorageState';

type IWithChildren = {
  children: ReactNode;
};

const AuthenticationContextProvider = ({ children }: IWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPendingAuthentication, setIsPendingAuthentication] = useState(false);
  const [loggedInUser] = useState(undefined);
  const [accessToken, setAccessToken] = useStorageState('accessToken');

  // check if accessToken is valid and set isAuthenticated
  useEffect(() => {
    if (accessToken[1] == null) {
      setIsAuthenticated(false);
    } else {
      setIsAuthenticated(true);
    }
  }, [accessToken]);

  return (
    <AuthenticationContext.Provider
      value={{
        loggedInUser,
        isAuthenticated,
        setIsAuthenticated,
        isPendingAuthentication,
        setIsPendingAuthentication,
        logIn: accessToken => {
          setAccessToken(accessToken);
          setIsAuthenticated(true);
          setIsPendingAuthentication(false);
        },
        logOut: () => {
          setAccessToken(null);
          setIsPendingAuthentication(false);
          setIsAuthenticated(false);
        },
        getAccessToken: () => {
          console.log('access token:', accessToken);
          console.log('isPendingAuthentication:', isPendingAuthentication);
          return accessToken[1];
        },
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
