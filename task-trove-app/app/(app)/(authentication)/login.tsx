import * as Linking from 'expo-linking';
import { Link, Stack } from 'expo-router';
import { Image, Button, styled, Text } from 'tamagui';
import { Container } from '~/components/Container';
import { useSession } from '~/contexts/session-provider';

export default function Login() {
  const url = Linking.useURL();
  const { signIn } = useSession();

  const Logo = styled(Image, {
    name: 'Logo',
    source: require('~/assets/tryve-logo.png'),
    width: '100%',
    height: 130,
  });

  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Logo />
        <Text>URL: {url}</Text>
        <Link href="/">Home</Link>
        <Link href="/1">Onboarding1</Link>

        <Button onPress={signIn}>Sign In With Monday</Button>

        <Image
          source={{
            uri: '/task-trove-app/assets/monday-avatar-2.svg',
            width: 500,
            height: 500,
          }}
        />
      </Container>
    </>
  );
}
