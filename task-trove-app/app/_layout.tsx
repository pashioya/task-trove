import { Slot } from 'expo-router';

import AuthenticationContextProvider from '~/contexts/AuthenticationContextProvider';

export default function RootLayout() {
  return (
    <>
      <AuthenticationContextProvider>
        <Slot />
      </AuthenticationContextProvider>
    </>
  );
}
