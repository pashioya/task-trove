import axios from 'axios';

import { OAUTH_SERVER_URL } from '~/app/_layout';

export async function getAccessToken(temporaryCode: string, storageKey: string) {
  const url = `${OAUTH_SERVER_URL}/access-token`;
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: url + '/access-token',
      headers: {
        temporary_code: temporaryCode,
        storage_key: storageKey,
      },
    };

    axios.request(config);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}
