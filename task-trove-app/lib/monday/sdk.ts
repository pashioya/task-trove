import mondaySdk from 'monday-sdk-js';
import { getSessionAsync } from '~/lib/session';

export const getMondaySdk = async () => {
  const session = await getSessionAsync();
  const monday = mondaySdk();

  monday.setApiVersion('2024-04');

  if (session) {
    monday.setToken(session.accessToken);
    return monday;
  }

  return monday;
};
