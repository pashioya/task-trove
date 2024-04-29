import Map from './Map'

export default function Home() {
    return <Map/>
}
  const url = Linking.useURL();

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <Link href="/login">Login</Link>

        <Text>URL: {url}</Text>
      </Container>
    </>
  );
}
