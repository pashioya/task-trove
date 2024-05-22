import { Button, type CardProps, Card, H2, Paragraph, XStack, Image } from 'tamagui';

import { router } from 'expo-router';

export function SimpleCard(props: CardProps) {
  return (
    <Card elevate size="$4" bordered {...props} height="60%">
      <Card.Header padded>
        <H2>Cannot View Map</H2>
        <Paragraph>Enable Location To View Map</Paragraph>
      </Card.Header>
      <Card.Footer padded>
        <XStack flex={1} />
        {/* //TODO: Fix this button so they can use the map imidietly */}
        <Button
          onPress={() => router.replace('/(app)/(drawer)/settings/location')}
          marginBottom={20}
          marginRight={20}
          borderRadius="$10"
        >
          Location Settings
        </Button>
      </Card.Footer>
      <Card.Background>
        <Image
          objectFit="contain"
          alignSelf="center"
          source={{
            width: 500,
            height: 300,
            uri: require('../assets/images/tryve-logo-black.png'),
          }}
        />
      </Card.Background>
    </Card>
  );
}
