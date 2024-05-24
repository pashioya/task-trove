import { asyncSecureStorage } from '../lib/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Board, Column, Item } from '../model/types';

type SettingsState = {
  onboardingCompleted: boolean;
  isError: boolean;
  error: Error | null;
  board: Board | null;
  column: Column | null;
  item: Item | null;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: Error) => void;
  setBoard: (board: Board) => void;
  setColumn: (column: Column) => void;
  setItem: (item: Item) => void;
};

const useSettingsStore = create<SettingsState>()(
  persist(
    set => ({
      onboardingCompleted: false,
      isError: false,
      error: null,
      board: null,
      column: null,
      item: null,
      setOnboardingCompleted: onboardingCompleted => set({ onboardingCompleted }),
      setIsError: isError => set({ isError }),
      setError: error => set({ error }),
      setBoard: board => set({ board }),
      setColumn: column => set({ column }),
      setItem: item => set({ item }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => asyncSecureStorage),
    },
  ),
);

export default useSettingsStore;
