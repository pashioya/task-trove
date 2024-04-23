import { Link, Stack } from 'expo-router';
import { Button } from 'tamagui';
import { Container } from '~/components/Container';

export default function Login() {
  return (
    <>
      <Stack.Screen options={{ title: 'login' }} />
      <Container>
        <Link href="/">Home</Link>
        <Link href="/success">Login Success</Link>
        <Button>Click me</Button>
      </Container>
    </>
  );
}
