import { useState, type ReactNode } from 'react';
import type { Board, Column, Item } from '~/model/types';
import SettingsContext from './SettingsContext';

type IWithChildren = {
  children: ReactNode;
};

const SettingsContextProvider = ({ children }: IWithChildren) => {
  const [board, setBoard] = useState<Board | null>(null);
  const [column, setColumn] = useState<Column | null>(null);
  const [item, setItem] = useState<Item | null>(null);
  const [isTracking, setIsTracking] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  return (
    <SettingsContext.Provider
      value={{
        isTracking,
        isError,
        error,
        board,
        column,
        item,
        setError,
        setIsError,
        setIsTracking,
        setBoard,
        setColumn,
        setItem,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export default SettingsContextProvider;
