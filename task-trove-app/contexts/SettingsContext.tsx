/* eslint-disable @typescript-eslint/no-empty-function */
/* the functions setBoard, setColumn, and setItem are empty here, the logic is in the SettingsContextProvider*/
import { createContext } from 'react';

import type { Board, Column, Item } from '~/model/types';

export type SettingsContextType = {
  board: Board;
  column: Column;
  item: Item;
  setBoard: (board: Board) => void;
  setColumn: (column: Column) => void;
  setItem: (item: Item) => void;
};

const SettingsContext = createContext<SettingsContextType>({
  board: {} as Board,
  column: {} as Column,
  item: {} as Item,
  setBoard: () => {},
  setColumn: () => {},
  setItem: () => {},
});

export default SettingsContext;
