import React, { createContext, useContext, useEffect, useCallback, useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthParams } from '~/hooks/useAuthParams';
import { useStorageState } from '~/hooks/useStorageState';
import { fetchAccessToken, fetchUserData } from '~/lib/session';
import type { Session, SessionContextType } from '~/lib/session/types';
import { env } from '~/lib/env';
import { useSettingsStore } from '~/store';

WebBrowser.maybeCompleteAuthSession();

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authParams = useAuthParams();
  const [isLoading, setIsLoading] = useState(false);
  const sessionFetchedRef = useRef(false);
  const [[isStorageLoading, session], setSession] = useStorageState<Session>('session');
  const {
    setOnboardingCompleted,
    setIsTracking,
    setBoard,
    setColumn,
    setItem,
    setTaskBoard,
    setTaskColumn,
    setStartTime,
    setEndTime,
    setActiveDays,
  } = useSettingsStore();

  const signIn = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      client_id: env.EXPO_PUBLIC_CLIENT_ID,
      redirect_uri: env.EXPO_PUBLIC_REDIRECT_URI,
      scope: env.EXPO_PUBLIC_SCOPES,
    }).toString();

    await WebBrowser.openAuthSessionAsync(
      `${env.EXPO_PUBLIC_AUTHORIZATION_ENDPOINT}?${params}`,
      env.EXPO_PUBLIC_REDIRECT_URI,
    );

    setIsLoading(false);
  }, []);

  const signOut = useCallback(() => {
    setIsTracking(false);
    setBoard(null);
    setColumn(null);
    setItem(null);
    setTaskBoard(null);
    setTaskColumn(null);
    setStartTime(540);
    setEndTime(1020);
    setActiveDays([]);
    setOnboardingCompleted(false);

    sessionFetchedRef.current = false;
    setSession(null);
  }, [
    setActiveDays,
    setBoard,
    setColumn,
    setEndTime,
    setIsTracking,
    setItem,
    setOnboardingCompleted,
    setSession,
    setStartTime,
    setTaskBoard,
    setTaskColumn,
  ]);

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
