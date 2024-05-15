import { Stack } from 'expo-router';
import { Image, Button, YStack } from 'tamagui';
import { Container } from '~/components/Container';
import { mondayColors } from '~/tamagui.config';
import { useSession } from '~/contexts/session-provider';

export default function Login() {
  const { signIn } = useSession();

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
          <Button backgroundColor={mondayColors.mondayDark} onPress={signIn}>
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
