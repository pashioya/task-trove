import Slider from '@react-native-community/slider';
import { View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';
import { INITIAL_REGION } from '~/config/map-config';

import { Text } from './ui/text';
import colors from 'tailwindcss/colors';

type MapRangePickerProps = {
  currentRange: number;
  setCurrentRange: (range: number) => void;
};

export const MapRangePicker: React.FC<MapRangePickerProps> = ({
  currentRange,
  setCurrentRange,
}) => {
  return (
    <>
      <MapView
        initialRegion={{
          latitude: INITIAL_REGION.latitude,
          longitude: INITIAL_REGION.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03,
        }}
        style={{ height: 300, width: 300 }}
      >
        <Marker
          coordinate={{ latitude: INITIAL_REGION.latitude, longitude: INITIAL_REGION.longitude }}
        />
        <Circle
          center={{
            latitude: INITIAL_REGION.latitude,
            longitude: INITIAL_REGION.longitude,
          }}
          radius={currentRange * 100}
          fillColor="#5A66CD1A"
          strokeWidth={0}
        />
      </MapView>
      <View className="items-center">
        <Slider
          style={{ width: '100%', height: 40 }}
          value={currentRange}
          onValueChange={value => setCurrentRange(value)}
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor={colors.neutral[300]}
        />
        <Text>{currentRange.toPrecision(2)} km</Text>
      </View>
    </>
  );
};
