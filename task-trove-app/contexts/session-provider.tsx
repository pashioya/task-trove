import React, { createContext, useContext, useEffect, useCallback, useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthParams } from '~/hooks/useAuthParams';
import { CLIENT_ID, REDIRECT_URI, SCOPES, AUTHORIZATION_ENDPOINT } from '~/config/auth-config';
import { useStorageState } from '~/hooks/useStorageState';
import { fetchAccessToken, fetchUserData } from '~/lib/session';
import type { Session, SessionContextType } from '~/lib/session/types';

WebBrowser.maybeCompleteAuthSession();

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authParams = useAuthParams();
  const [isLoading, setIsLoading] = useState(false);
  const sessionFetchedRef = useRef(false);
  const [[isStorageLoading, session], setSession] = useStorageState<Session>('session');

  const signIn = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      client_id: CLIENT_ID,
      redirect_uri: REDIRECT_URI,
      scope: SCOPES.join(' '),
    }).toString();

    await WebBrowser.openAuthSessionAsync(`${AUTHORIZATION_ENDPOINT}?${params}`, REDIRECT_URI);

    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    sessionFetchedRef.current = false;
    setSession(null);
  }, [setSession]);

  useEffect(() => {
    const fetchSession = async () => {
      if (!authParams || sessionFetchedRef.current) return;
      setIsLoading(true);
      try {
        const accessToken = await fetchAccessToken(authParams);
        const user = await fetchUserData(accessToken);

        setSession({ accessToken, user });
        sessionFetchedRef.current = true;
      } catch (error) {
        // TODO: Implement logging and improve error handling
        console.error('Error fetching session:', error);
        setSession(null);
        sessionFetchedRef.current = false;
      } finally {
        setIsLoading(false);
      }
    };

    fetchSession();
  }, [authParams, setSession]);

  const value = { session, signIn, signOut, isLoading: isLoading || isStorageLoading };

  return <SessionContext.Provider value={value}>{children}</SessionContext.Provider>;
};

function useSession() {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
}

export { SessionProvider, useSession };
