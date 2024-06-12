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
  taskBoard: Board | null;
  taskColumn: Column | null;
  notificationRadius: number;
  descriptionColumnId: string;
  locationUpdateInterval: number;
  locationUpdateDistance: number;
  allowNotifications: boolean;
  setAllowNotifications: (allowNotifications: boolean) => void;
  setNotificationRadius: (notificationRadius: number) => void;
  setLocationUpdateDistance: (locationUpdateDistance: number) => void;
  setLocationUpdateInterval: (locationUpdateInterval: number) => void;
  setActiveDays: (activeDays: number[]) => void;
  setEndTime: (endTime: number) => void;
  setStartTime: (startTime: number) => void;
  setOnboardingCompleted: (onboardingCompleted: boolean) => void;
  setIsTracking: (isTracking: boolean) => void;
  setIsError: (isError: boolean) => void;
  setError: (error: Error) => void;
  setBoard: (board: Board | null) => void;
  setColumn: (column: Column | null) => void;
  setItem: (item: Item | null) => void;
  setTaskBoard: (taskBoard: Board | null) => void;
  setTaskColumn: (taskColumn: Column | null) => void;
  setDescriptionColumnId: (descriptionColumnId: string) => void;
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
      activeDays: [0, 1, 2, 3, 4],
      taskBoard: null,
      taskColumn: null,
      notificationRadius: 2.5,
      descriptionColumnId: '',
      locationUpdateInterval: 60000,
      locationUpdateDistance: 10,
      allowNotifications: true,
      setAllowNotifications: allowNotifications => set({ allowNotifications }),
      setNotificationRadius: notificationRadius => set({ notificationRadius }),
      setLocationUpdateDistance: locationUpdateDistance => set({ locationUpdateDistance }),
      setLocationUpdateInterval: locationUpdateInterval => set({ locationUpdateInterval }),
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
      setTaskBoard: taskBoard => set({ taskBoard }),
      setTaskColumn: taskColumn => set({ taskColumn }),
      setDescriptionColumnId: descriptionColumnId => set({ descriptionColumnId }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => asyncSecureStorage),
    },
  ),
);

export default useSettingsStore;
