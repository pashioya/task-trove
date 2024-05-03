import { useEffect, useState, type ReactNode } from 'react';

import AuthenticationContext from './AuthenticationContext';

import { useStorageState } from '~/hooks/useStorageState';

type IWithChildren = {
  children: ReactNode;
};

const AuthenticationContextProvider = ({ children }: IWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser] = useState(undefined);
  const [accessToken, setAccessToken] = useStorageState('accessToken');

  // check if accessToken is valid and set isAuthenticated
  useEffect(() => {
    if (accessToken) {
      setIsAuthenticated(true); // Update only when accessToken changes
    }
  }, [accessToken]);

  return (
    <AuthenticationContext.Provider
      value={{
        loggedInUser,
        isAuthenticated,
        isPendingAuthentication: false,
        logIn: accessToken => setAccessToken(accessToken),
        logOut: () => {
          setAccessToken(null);
          setIsAuthenticated(false);
        },
        getAccessToken: () => accessToken[1],
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
