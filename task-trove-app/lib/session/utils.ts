import { type AuthParams } from '~/hooks/useAuthParams';
import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import mondaySdk from 'monday-sdk-js';
import { RawUserSchema, SessionSchema, TokenResponseSchema } from './schema';
import type { AccessToken, TokenResponse } from './types';

export const fetchAccessToken = async (authParams: AuthParams) => {
  const tokenResponse = await axios.post<TokenResponse>(
    `https://live1-service-5671083-bb7bd782.us.monday.app/access-token`,
    {
      code: authParams.code,
      state: authParams.state,
    },
  );

  const parsedTokenResponse = TokenResponseSchema.parse(tokenResponse.data);
  const accessToken = parsedTokenResponse.access_token;

  return accessToken;
};

export const getSessionAsync = async () => {
  const session = await SecureStore.getItemAsync('auth_session');

  if (!session) {
    return null;
  }

  const parsedSession = SessionSchema.safeParse(JSON.parse(session));

  if (parsedSession.success) {
    return parsedSession.data;
  }

  return null;
};

export const fetchUserData = async (accessToken: AccessToken) => {
  try {
    const monday = mondaySdk();
    monday.setToken(accessToken);

    const userQuery = /* GraphQL */ `
      {
        me {
          id
          name
          email
          photo_thumb_small
          account {
            slug
          }
        }
      }
    `;

    const userResponse = await monday.api(userQuery);

    if ('error_message' in userResponse && typeof userResponse.error_message === 'string') {
      console.error(`Error fetching user data: ${userResponse.error_message}`);

      return null;
    }

    const parsedUserResponse = RawUserSchema.safeParse(userResponse.data);

    if (parsedUserResponse.success) {
      const {
        me: { email, id, name, photo_thumb_small, account },
      } = parsedUserResponse.data;

      const accountSlug = account.slug;

      return {
        id,
        name,
        email,
        thumbnail: photo_thumb_small,
        slug: accountSlug,
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching user data:', error);
    return null;
  }
};
