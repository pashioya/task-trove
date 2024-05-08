import React, { createContext } from 'react';

import type { Board } from '~/model/Board';
import type { Column } from '~/model/Column';
import type { Item } from '~/model/Item';

export type SettingsContext = {
  board: Board;
  column: Column;
  item: Item;
  setBoard: (board: Board) => void;
  setColumn: (column: Column) => void;
  setItem: (item: Item) => void;
};

const SettingsContext = createContext<SettingsContext>({
  board: {} as Board,
  column: {} as Column,
  item: {} as Item,
  setBoard: () => {},
  setColumn: () => {},
  setItem: () => {},
});

export default SettingsContext;
