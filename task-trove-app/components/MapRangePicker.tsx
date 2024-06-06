import Slider from '@react-native-community/slider';
import { ActivityIndicator, Pressable, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { INITIAL_REGION } from '~/config/map-config';
import lightStyle from '~/assets/map/lightStyle.json';
import darkStyle from '~/assets/map/darkStyle.json';

import { Text } from './ui/text';
import colors from 'tailwindcss/colors';
import { useColorScheme } from '~/lib/useColorScheme';
import { Button } from './ui/button';
import { useState } from 'react';
import useUserLocation from '~/hooks/useUserLocation';

type MapRangePickerProps = {
  currentRange: number;
  setCurrentRange: (range: number) => void;
};

export const MapRangePicker: React.FC<MapRangePickerProps> = ({
  currentRange,
  setCurrentRange,
}) => {
  const { isDarkColorScheme } = useColorScheme();
  const [value, setValue] = useState<number>(currentRange);
  const { lastKnownLocation, lastKnownLocationLoading } = useUserLocation();

  if (lastKnownLocationLoading) {
    return (
      <View className="justify center">
        <ActivityIndicator />
      </View>
    );
  }

  const location = lastKnownLocation?.coords ?? INITIAL_REGION;

  return (
    <>
      <Pressable>
        <MapView
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.3,
            longitudeDelta: 0.3,
          }}
          showsMyLocationButton={false}
          showsUserLocation
          customMapStyle={isDarkColorScheme ? darkStyle : lightStyle}
          style={{ height: 300, width: 300 }}
        >
          {!lastKnownLocation && (
            <Marker
              pinColor={colors.blue[500]}
              coordinate={{
                latitude: INITIAL_REGION.latitude,
                longitude: INITIAL_REGION.longitude,
              }}
            />
          )}

          <Circle
            center={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            radius={value * 1000}
            fillColor="rgba(20,87, 255, 0.2)"
            strokeWidth={0}
          />
        </MapView>
      </Pressable>
      <View className="items-center">
        <Slider
          style={{ width: '100%', height: 40 }}
          value={currentRange}
          onValueChange={value => setValue(value)}
          minimumValue={0}
          maximumValue={5}
          minimumTrackTintColor={colors.neutral[500]}
          maximumTrackTintColor={colors.neutral[300]}
          thumbTintColor={colors.blue[500]}
        />
        <Text>{value.toPrecision(2)} km</Text>
        <Button onPress={() => setCurrentRange(value)}>
          <Text>Confirm</Text>
        </Button>
      </View>
    </>
  );
};
