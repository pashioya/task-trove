import * as SecureStore from 'expo-secure-store';
import * as React from 'react';
import { Platform } from 'react-native';

type UseStateHook<T> = [[boolean, T | null], (value: T | null) => void];

function useAsyncState<T>(initialValue: [boolean, T | null] = [true, null]): UseStateHook<T> {
  return React.useReducer(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    (state: [boolean, T | null], action: T | null = null): [boolean, T | null] => [false, action],
    initialValue,
  ) as UseStateHook<T>;
}

export async function setStorageItemAsync<T>(key: string, value: T | null) {
  const serializedValue = value === null ? null : JSON.stringify(value);

  if (Platform.OS === 'web') {
    try {
      if (serializedValue === null) {
        localStorage.removeItem(key);
      } else {
        localStorage.setItem(key, serializedValue);
      }
    } catch (e) {
      console.error('Local storage is unavailable:', e);
    }
  } else {
    if (serializedValue == null) {
      await SecureStore.deleteItemAsync(key);
    } else {
      await SecureStore.setItemAsync(key, serializedValue);
    }
  }
}

export function useStorageState<T = string>(key: string): UseStateHook<T> {
  const [state, setState] = useAsyncState<T>();

  // Get
  React.useEffect(() => {
    if (Platform.OS === 'web') {
      try {
        const item = localStorage.getItem(key);
        setState(item ? (JSON.parse(item) as T) : null);
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      const getValue = async () => {
        try {
          const item = await SecureStore.getItemAsync(key);
          setState(item ? (JSON.parse(item) as T) : null);
        } catch (error) {
          console.error('Error fetching value from secure store:', error);
        }
      };

      getValue();
    }
  }, [key, setState]);

  // Set
  const setValue = React.useCallback(
    (value: T | null) => {
      setState(value);
      setStorageItemAsync(key, value);
    },
    [key, setState],
  );

  return [state, setValue];
}
