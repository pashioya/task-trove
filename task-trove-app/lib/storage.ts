import { setItemAsync, getItemAsync, deleteItemAsync } from 'expo-secure-store';

export const expoSecureStorage = {
  setItem: async (key: string, value: string) => await setItemAsync(key, value),
  getItem: async (key: string) => (await getItemAsync(key)) as Promise<string> | null,
  removeItem: async (key: string) => await deleteItemAsync(key),
};
