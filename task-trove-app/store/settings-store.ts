import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Board, Column, Item } from '../model/types';

type SettingsState = {
  isTracking: boolean;
  isError: boolean;
  error: Error;
  board: Board;
  column: Column;
  item: Item;
  setIsError: (isError: boolean) => void;
  setError: (error: Error) => void;
  setIsTracking: (isTracking: boolean) => void;
  setBoard: (board: Board) => void;
  setColumn: (column: Column) => void;
  setItem: (item: Item) => void;
};

const useSettingsStore = create<SettingsState>()(
  devtools(set => ({
    isTracking: false,
    isError: false,
    error: {} as Error,
    board: {} as Board,
    column: {} as Column,
    item: {} as Item,
    setIsError: isError => set({ isError }),
    setError: error => set({ error }),
    setIsTracking: isTracking => set({ isTracking }),
    setBoard: board => set({ board }),
    setColumn: column => set({ column }),
    setItem: item => set({ item }),
  })),
);

export default useSettingsStore;
