import { Link, Stack } from 'expo-router';
import { Text } from 'tamagui';
import { View, StyleSheet } from 'react-native';

import { Container } from '~/components/Container';

export default function One() {
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding One' }} />
      <Container>
        <View style={styles.page}>
          <Text style={{ color: 'blue', fontSize: 30 }}>Onboarding One</Text>
          <Text style={styles.description}>Description</Text>
          <Link href="/2">Next</Link>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'blue',
    fontSize: 30,
  },
  description: {
    fontSize: 18,
  },
});
