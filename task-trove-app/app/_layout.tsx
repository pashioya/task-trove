import { Slot } from 'expo-router';

import AuthenticationContextProvider from '~/contexts/AuthenticationContextProvider';

// export const OAUTH_SERVER_URL = 'https://live1-service-5671083-bb7bd782.us.monday.app/';

export const OAUTH_SERVER_URL = 'https://b3f9-91-179-154-0.ngrok-free.app/';

//3780-91-179-154-0.ngrok-free.app/auth-token
export const CLIENT_ID = '529393aedf8ae08c5ab90e730836814a';

export default function RootLayout() {
  return (
    <>
      <AuthenticationContextProvider>
        <Slot />
      </AuthenticationContextProvider>
    </>
  );
}
