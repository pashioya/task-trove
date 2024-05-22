/* eslint-disable @typescript-eslint/no-empty-function */
/* the functions setBoard, setColumn, and setItem are empty here, the logic is in the SettingsContextProvider*/
import { createContext } from 'react';

import type { Board, Column, Item } from '~/model/types';

export type SettingsContextType = {
  isTracking: boolean;
  isError: boolean;
  error: Error | null;
  board: Board | null;
  column: Column | null;
  item: Item | null;
  setIsError: (isError: boolean) => void;
  setError: (error: Error) => void;
  setIsTracking: (isTracking: boolean) => void;
  setBoard: (board: Board) => void;
  setColumn: (column: Column) => void;
  setItem: (item: Item) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  isTracking: false,
  isError: false,
  error: null,
  board: null,
  column: null,
  item: null,
  setIsError: () => {},
  setError: () => {},
  setIsTracking: () => {},
  setBoard: () => {},
  setColumn: () => {},
  setItem: () => {},
});

export default SettingsContext;
