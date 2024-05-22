import AsyncStorage from '@react-native-async-storage/async-storage';

export const expoSecureStorage = {
  setItem: async (key: string, value: string) => await AsyncStorage.setItem(key, value),
  getItem: async (key: string) => (await AsyncStorage.getItem(key)) as Promise<string> | null,
  removeItem: async (key: string) => await AsyncStorage.removeItem(key),
};
