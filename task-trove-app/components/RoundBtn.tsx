import { View, TouchableOpacity } from 'react-native';
import { Text } from '~/components/ui/text';

type RoundBtnProps = {
  letter: string;
  text: string;
  color?: string;
  letterStyles?: string;
  textStyles?: string;
  onPress?: () => void;
};

const RoundBtn = ({ letter, text, color, letterStyles, textStyles, onPress }: RoundBtnProps) => {
  return (
    <TouchableOpacity className="rounded-full items-center gap-1" onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        className={color}
      >
        <Text className={letterStyles}>{letter}</Text>
      </View>
      <Text className={textStyles}>{text}</Text>
    </TouchableOpacity>
  );
};
export default RoundBtn;
