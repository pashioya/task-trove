/* eslint-disable @typescript-eslint/no-empty-function */
/* the functions setBoard, setColumn, and setItem are empty here, the logic is in the SettingsContextProvider*/
import { createContext } from 'react';

import type { Board, Column, Item } from '~/model/types';

export type SettingsContextType = {
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

const SettingsContext = createContext<SettingsContextType>({
  isTracking: false,
  isError: false,
  error: {} as Error,
  board: {} as Board,
  column: {} as Column,
  item: {} as Item,
  setIsError: () => {},
  setError: () => {},
  setIsTracking: () => {},
  setBoard: () => {},
  setColumn: () => {},
  setItem: () => {},
});

export default SettingsContext;
