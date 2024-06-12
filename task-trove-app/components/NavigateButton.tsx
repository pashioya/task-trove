import { Navigation } from 'lucide-react-native';
import { ActivityIndicator, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

type NavigateButtonProps = {
  lastKnownLocationLoading: boolean;
  isDarkColorScheme: boolean;
  onLocateMe: () => void;
};

export default function NavigateButton({
  lastKnownLocationLoading,
  isDarkColorScheme,
  onLocateMe,
}: NavigateButtonProps) {
  const locateMeBounceValue = useSharedValue(1);
  const locateMeBounceAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(locateMeBounceValue.value) }],
    };
  });

  const handleLocateMeBounce = () => {
    locateMeBounceValue.value = 0.8;
    setTimeout(() => {
      locateMeBounceValue.value = 1;
    }, 25);
  };
  return (
    <Animated.View
      style={locateMeBounceAnimation}
      className="bg-secondary rounded-full h-[70px] w-[70px] shadow-lg flex items-center justify-center"
    >
      <Pressable
        onPress={() => {
          handleLocateMeBounce();
          onLocateMe();
        }}
      >
        {lastKnownLocationLoading ? (
          <ActivityIndicator size="large" color={colors.blue[500]} />
        ) : (
          <Navigation
            color={isDarkColorScheme ? colors.neutral[100] : colors.blue[500]}
            fill={isDarkColorScheme ? colors.gray[100] : colors.blue[500]}
            className="bg-white"
            size={30}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}
