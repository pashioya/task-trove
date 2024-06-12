import { Pause, Play } from 'lucide-react-native';
import { Pressable } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import colors from 'tailwindcss/colors';

type NavigateButtonProps = {
  isDarkColorScheme: boolean;
  internetConnected: boolean;
  isTracking: boolean;
  toggleShareLocation: () => void;
};

export default function NavigateButton({
  isDarkColorScheme,
  internetConnected,
  isTracking,
  toggleShareLocation,
}: NavigateButtonProps) {
  const playPauseBounceValue = useSharedValue(1);

  const playPauseBounceAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(playPauseBounceValue.value) }],
    };
  });

  const handlePlayPauseBounce = () => {
    playPauseBounceValue.value = 0.8;
    setTimeout(() => {
      playPauseBounceValue.value = 1;
    }, 25);
  };
  return (
    <Animated.View
      style={playPauseBounceAnimation}
      className="bg-primary shadow-2xl rounded-full h-[70px] w-[70px] flex items-center justify-center"
    >
      <Pressable
        style={{ opacity: internetConnected ? 1 : 0.5 }}
        onPress={() => {
          handlePlayPauseBounce();
          toggleShareLocation();
        }}
      >
        {isTracking ? (
          <Pause
            color={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
            fill={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
            className="bg-primary shadow-2xl"
            size={30}
          />
        ) : (
          <Play
            color={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
            fill={isDarkColorScheme ? colors.gray[100] : colors.gray[100]}
            className="bg-primary shadow-2xl"
            size={30}
          />
        )}
      </Pressable>
    </Animated.View>
  );
}
