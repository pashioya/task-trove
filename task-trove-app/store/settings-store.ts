import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Board, Column, Item } from '../model/types';

type SettingsState = {
  isError: boolean;
  error: Error | null;
  board: Board | null;
  column: Column | null;
  item: Item | null;
  setIsError: (isError: boolean) => void;
  setError: (error: Error) => void;
  setBoard: (board: Board) => void;
  setColumn: (column: Column) => void;
  setItem: (item: Item) => void;
};

const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      isError: false,
      error: null,
      board: null,
      column: null,
      item: null,
      setIsError: isError => set({ isError }),
      setError: error => set({ error }),
      setBoard: board => set({ board }),
      setColumn: column => set({ column }),
      setItem: item => set({ item }),
    }),
    {
      name: 'settings-storage',
      getStorage: () => AsyncStorage,
    },
  ),
);

export default useSettingsStore;
