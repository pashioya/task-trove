import axios from 'axios';

const oAuthServerUrl = 'https://fd20a-service-5671083-df6cea70.us.monday.app';

export async function getAccessToken(temporaryCode: string, storageKey: string) {
  const url = `${oAuthServerUrl}/access-token`;
  try {
    await axios({
      method: 'post',
      url: url + '/access-token',
      data: {
        temporary_code: temporaryCode,
        storage_key: storageKey,
      },
    });
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
}
