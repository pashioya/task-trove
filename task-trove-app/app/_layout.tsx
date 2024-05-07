import { Slot } from 'expo-router';

import AuthenticationContextProvider from '~/contexts/AuthenticationContextProvider';

export const OAUTH_SERVER_URL = 'https://ac351-service-5671083-df6cea70.us.monday.app';

export default function RootLayout() {
  return (
    <>
      <AuthenticationContextProvider>
            <Slot />
      </AuthenticationContextProvider>
    </>
  );
}
