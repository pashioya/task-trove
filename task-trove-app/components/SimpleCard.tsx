import { Button, type CardProps, Card, H2, Paragraph, XStack, Image } from 'tamagui';
import { useToggleShareLocation } from '~/hooks';
import * as Burnt from 'burnt';

export function SimpleCard(props: CardProps) {
  const { toggleShareLocation } = useToggleShareLocation();

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
          disabled
          onPress={() => {
            toggleShareLocation()
              .then(() => {
                Burnt.toast({
                  title: 'Location enabled',
                  message: 'Location Tracking Enabled',
                  preset: 'done',
                });
              })
              .catch(error => {
                Burnt.toast({
                  title: 'Error Enabling Tracking',
                  message: error,
                  preset: 'error',
                });
              });
          }}
          marginBottom={20}
          marginRight={20}
          borderRadius="$10"
        >
          Enable
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
