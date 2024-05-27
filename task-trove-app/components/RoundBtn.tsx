import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

type RoundBtnProps = {
  letter: string;
  text: string;
  color?: string;
  onPress?: () => void;
};

const RoundBtn = ({ letter, text, color, onPress }: RoundBtnProps) => {
  if (!color) {
    color = colors.gray[300];
  }
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          backgroundColor: color,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text style={styles.label}>{letter}</Text>
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
});
export default RoundBtn;
