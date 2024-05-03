import { ReactNode, useEffect, useState } from 'react';

import AuthenticationContext from './AuthenticationContext';

import { useStorageState } from '~/hooks/useStorageState';

interface IWithChildren {
  children: ReactNode;
}

const AuthenticationContextProvider = ({ children }: IWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedInUser] = useState(undefined);
  const [accessToken, setAccessToken] = useStorageState('accessToken');
  const [storage_key, setStorageKey] = useStorageState('storageKey');
  const [temp_code, setTempCode] = useStorageState('tempCode');

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
        setTempCode: tempCode => {
          setTempCode(tempCode);
        },
        setStorageKey: storageKey => {
          setStorageKey(storageKey);
        },
        logIn: accessToken => setAccessToken(accessToken),
        logOut: () => {
          setAccessToken(null);
          setIsAuthenticated(false);
        },
        getAccessToken: () => accessToken[1],
        getStorageKey: () => storage_key[1],
        getTempCode: () => temp_code[1],
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthenticationContextProvider;
