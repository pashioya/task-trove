import React, { createContext, useContext, useEffect, useCallback, useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthParams } from '~/hooks/useAuthParams';
import { useStorageState } from '~/hooks/useStorageState';
import { fetchAccessToken, fetchUserData } from '~/lib/session';
import type { Session, SessionContextType } from '~/lib/session/types';
import { useSettingsStore } from '~/store';
import { Linking, Platform } from 'react-native';
import useTaskStore from '~/store/tasks-store';

WebBrowser.maybeCompleteAuthSession();

const SessionContext = createContext<SessionContextType | undefined>(undefined);

const SessionProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const authParams = useAuthParams();
  const [isLoading, setIsLoading] = useState(false);
  const sessionFetchedRef = useRef(false);
  const [[isStorageLoading, session], setSession] = useStorageState<Session>('auth_session');
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
    setDescriptionColumnId,
  } = useSettingsStore();
  
  const { setTasks } = useTaskStore();

  const signIn = useCallback(async () => {
    setIsLoading(true);
    const params = new URLSearchParams({
      client_id: '529393aedf8ae08c5ab90e730836814a',
      redirect_uri: 'https://live1-service-5671083-bb7bd782.us.monday.app/auth-code',
      scope: 'me:read boards:read boards:write',
    }).toString();

    if (Platform.OS === 'ios') {
      Linking.openURL(`https://auth.monday.com/oauth2/authorize?${params}`);
    } else {
      await WebBrowser.openAuthSessionAsync(
        `https://auth.monday.com/oauth2/authorize?${params}`,
        'https://live1-service-5671083-bb7bd782.us.monday.app/auth-code',
      );
    }

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
    setActiveDays([0, 1, 2, 3, 4]);
    setOnboardingCompleted(false);
    setDescriptionColumnId('');
    
    setTasks(null);

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
