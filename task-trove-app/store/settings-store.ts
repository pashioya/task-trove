import { asyncSecureStorage } from '../lib/storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import type { Board, Column, Item } from '../model/types';

type SettingsState = {
  onboardingCompleted: boolean;
  isError: boolean;
  isTracking: boolean;
  error: Error | null;
  board: Board | null;
  column: Column | null;
  item: Item | null;
  startTime: number;
  endTime: number;
  activeDays: number[];
  setActiveDays: (activeDays: number[]) => void;
  setEndTime: (endTime: number) => void;
  setStartTime: (startTime: number) => void;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
  setIsTracking: (isTracking: boolean) => void;
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
      isTracking: false,
      isError: false,
      error: null,
      board: null,
      column: null,
      item: null,
      startTime: 540, // 9 AM (minutes since midnight: 9 * 60 + 0)
      endTime: 1020, // 5 PM
      activeDays: [],
      setActiveDays: activeDays => set({ activeDays }),
      setEndTime: endTime => set({ endTime }),
      setStartTime: startTime => set({ startTime }),
      setOnboardingCompleted: onboardingCompleted => set({ onboardingCompleted }),
      setIsTracking: isTracking => set({ isTracking }),
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
