import { Alert } from 'react-native';

type ButtonConfig = {
  text: string;
  onPress?: () => void;
};

export const showGeneralAlert = (
  title: string,
  message: string,
  additionalButtons: ButtonConfig[] = [],
) => {
  const defaultButton = { text: 'Dismiss' };
  const alertButtons = [...additionalButtons, defaultButton];

  Alert.alert(title, message, alertButtons);
};
