import { ReactNode, useEffect, useState } from 'react';

import AuthenticationContext from './AuthenticationContext';

import { useStorageState } from '~/hooks/useStorageState';

interface IWithChildren {
  children: ReactNode;
}

const AuthenticationContextProvider = ({ children }: IWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser] = useState(undefined);
  // ! The isLoading not used but may be useful when doing the buffer authentication
  const [[isLoading, accessToken], setAccessToken] = useStorageState('accessToken');

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
        logIn: accessToken => setAccessToken(accessToken),
        logOut: () => setAccessToken(null),
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
