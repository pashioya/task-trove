import axios from 'axios';

import { OAUTH_SERVER_URL } from '~/app/_layout';

export async function getAccessToken(temporaryCode: string, storageKey: string) {
  const url = `${OAUTH_SERVER_URL}/access-token`;
  try {
    const config = {
      method: 'post',
      url: url + '/access-token',
      data: {
        temporary_code: temporaryCode,
        storage_key: storageKey,
      },
    };
    // TODO: ADD ZOD to validate the response
    return (await axios.request<{ access_token: string }>(config)).data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}
