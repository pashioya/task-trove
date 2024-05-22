import React from 'react';
import MapView from 'react-native-maps';
import { Slider, type SliderProps, Text, YStack } from 'tamagui';
import { useToggleShareLocation } from '~/hooks';
import { SimpleCard } from './SimpleCard';

type RangeSelectorProps = SliderProps & {
  currentRange?: number;
};

export const NotificationRangeSelector: React.FC<RangeSelectorProps> = ({
  currentRange,
  ...rest
}) => {
  const { isTracking } = useToggleShareLocation();

  return (
    <YStack gap={10}>
      <Text fontSize={24} color="black">
        Notification Range Selector
      </Text>
      {isTracking ? (
        <MapView followsUserLocation showsUserLocation style={{ width: 400, height: 400 }} />
      ) : (
        <SimpleCard />
      )}

      <Slider marginTop={40} defaultValue={[currentRange || 50]} max={100} step={1} {...rest}>
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb index={0} elevate circular />
      </Slider>
    </YStack>
  );
};
