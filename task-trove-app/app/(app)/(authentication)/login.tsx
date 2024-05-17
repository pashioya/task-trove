import { Stack } from 'expo-router';
import { Image, Button, YStack, Separator } from 'tamagui';
import { Container } from '~/components/Container';
import { mondayColors, Title } from '~/tamagui.config';
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
              height: 100,
            }}
            width="100%"
          />
        </YStack>

        <YStack marginTop="80%" gap="$3" alignItems="center">
          <Title fontSize={30}>Sign in with</Title>
          <Separator width={250} marginBottom={40} />
          <Button
            color="white"
            size={60}
            backgroundColor={mondayColors.mondayDark}
            onPress={signIn}
          >
            <Image
              source={{
                uri: require('~/assets/images/monday-white.png'),
                width: 90,
                height: 80,
              }}
              width="100%"
            />
          </Button>
        </YStack>
      </Container>
    </>
  );
}
