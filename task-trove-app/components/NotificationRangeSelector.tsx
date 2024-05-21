import React from 'react';
import { Slider, type SliderProps, Text, YStack } from 'tamagui';

type RangeSelectorProps = SliderProps & {
  currentRange?: number;
};

export const NotificationRangeSelector: React.FC<RangeSelectorProps> = ({
  currentRange,
  ...rest
}) => {
  return (
    <YStack>
      <Text fontSize={24} color="black">
        Notification Range Selector
      </Text>
      <Slider defaultValue={[currentRange || 50]} max={100} step={1} {...rest}>
        <Slider.Track>
          <Slider.TrackActive />
        </Slider.Track>
        <Slider.Thumb index={0} circular elevate />
      </Slider>
    </YStack>
  );
};
