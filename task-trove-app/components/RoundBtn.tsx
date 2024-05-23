import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from 'tailwindcss/colors';

type RoundBtnProps = {
  letter: string;
  text: string;
  onPress?: () => void;
};

const RoundBtn = ({ letter, text, onPress }: RoundBtnProps) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.circle}>
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
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.gray[200],
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.black,
  },
});
export default RoundBtn;
