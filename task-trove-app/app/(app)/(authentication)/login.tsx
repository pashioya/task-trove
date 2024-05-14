import * as Linking from 'expo-linking';
import { Stack } from 'expo-router';
import { Image, Button, YStack } from 'tamagui';
import { Container } from '~/components/Container';
import { mondayColors } from '~/tamagui.config';

export default function Login() {
  const openMonday = async () => {
    const url =
      'https://auth.monday.com/oauth2/authorize?client_id=55b279c1eb45e23ce60d4cc032d63ab6&redirect_uri=http://localhost:8080/auth-token&scope=me:read&app_version_id=10233356';
    await Linking.openURL(url);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <YStack marginTop="$15" alignContent="center" alignItems="center">
          <Image
            objectFit="contain"
            source={{
              uri: require('~/assets/images/tryve-logo.png'),
              height: 130,
            }}
            width="100%"
          />
        </YStack>

        <YStack
          marginBottom="$15"
          alignSelf="center"
          gap="$4"
          position="absolute"
          bottom={0}
          justifyContent="center"
          alignContent="center"
        >
          <Button backgroundColor={mondayColors.mondayDark} onPress={openMonday}>
            <Image
              source={{
                uri: require('~/assets/images/monday-white.png'),
                height: 30,
              }}
              width={100}
            />
          </Button>
        </YStack>
      </Container>
    </>
  );
}
