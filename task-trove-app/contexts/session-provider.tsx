import React, { createContext, useContext, useEffect, useCallback, useRef, useState } from 'react';
import * as WebBrowser from 'expo-web-browser';
import { useAuthParams, type AuthParams } from '~/hooks/useAuthParams';
import axios from 'axios';
import {
  CLIENT_ID,
  OAUTH_SERVER_URL,
  REDIRECT_URI,
  SCOPES,
  AUTHORIZATION_ENDPOINT,
} from '~/config/auth-config';
import { useStorageState } from '~/hooks/useStorageState';
import mondaySdk from 'monday-sdk-js';
import { z } from 'zod';
import * as SecureStore from 'expo-secure-store';

const monday = mondaySdk();

WebBrowser.maybeCompleteAuthSession();

const TokenResponseSchema = z.object({
  access_token: z.string(),
  token_type: z.string(),
});

const UserSchema = z
  .object({
    me: z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      photo_thumb_small: z.string(),
    }),
  })
  .transform(({ me }) => ({
    id: me.id,
    name: me.name,
    email: me.email,
    thumbnail: me.photo_thumb_small,
  }));

const accessToken = z.string();

const SessionSchema = z.object({
  accessToken: accessToken.min(1),
  user: UserSchema.nullable(),
});

export type User = z.infer<typeof UserSchema>;
export type AccessToken = z.infer<typeof accessToken>;

type TokenResponse = z.infer<typeof TokenResponseSchema>;

export type Session = z.infer<typeof SessionSchema>;

type SessionContextType = {
  session: Session | null;
  signIn: () => Promise<void>;
  signOut: () => void;
  isLoading: boolean;
};

const fetchAccessToken = async (authParams: AuthParams) => {
  const tokenResponse = await axios.post<TokenResponse>(`${OAUTH_SERVER_URL}/access-token`, {
    code: authParams.code,
    state: authParams.state,
  });

  const parsedTokenResponse = TokenResponseSchema.parse(tokenResponse.data);
  const accessToken = parsedTokenResponse.access_token;

  return accessToken;
};

const fetchUserData = async (accessToken: AccessToken) => {
  try {
    monday.setToken(accessToken);
    monday.setApiVersion('2024-04');

    const userQuery = /* GraphQL */ `
      {
        me {
          id
          name
          email
          photo_thumb_small
        }
      }
    `;

    const userResponse = await monday.api(userQuery);

    if ('error_message' in userResponse && typeof userResponse.error_message === 'string') {
      console.error(`Error fetching user data: ${userResponse.error_message}`);

      return null;
    }

    const parsedUserResponse = UserSchema.safeParse(userResponse.data);

    if (parsedUserResponse.success) {
      return parsedUserResponse.data;
    }

    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};

const SessionContext = createContext<SessionContextType | undefined>(undefined);

export const getSessionAsync = async () => {
  const session = await SecureStore.getItemAsync('session');

  if (!session) {
    return null;
  }

  const parsedSession = SessionSchema.safeParse(JSON.parse(session));

  if (parsedSession.success) {
    return parsedSession.data;
  }

  return null;
};

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
