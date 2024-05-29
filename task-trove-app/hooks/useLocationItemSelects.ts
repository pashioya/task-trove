import { useEffect, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { useSettingsStore } from '~/store';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchBoardsQuery, fetchColumnsQuery, fetchItemsQuery } from '~/lib/monday/queries';
import type { MondayAPIError } from '~/lib/monday/error';
import { handleMondayErrorCode, handleMondayErrorStatusCode } from '~/utils/MondayErrorHandling';
import { Alert } from 'react-native';

const useLocationItemSelects = () => {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [selectedTaskBoard, setSelectedTaskBoard] = useState<Board | null>(null);
  const [selectedTaskColumn, setSelectedTaskColumn] = useState<Column | null>(null);

  const [boardSelectItems, setBoardSelectItems] = useState<{ label: string; value: string }[]>([]);
  const [columnSelectItems, setColumnSelectItems] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [itemSelectItems, setItemSelectItems] = useState<{ label: string; value: string }[]>([]);

  const { board, column, item } = useSettingsStore();

  const showAlert = (error: MondayAPIError) => {
    if (error.errors) {
      Alert.alert('Error', error.errorMessage, [{ text: 'Dismiss' }]);
    } else if (error.errorCode) {
      const errorMessage = handleMondayErrorCode(error.errorCode);
      Alert.alert('Error', errorMessage, [{ text: 'Dismiss' }]);
    } else if (error.statusCode) {
      const errorMessage = handleMondayErrorStatusCode(error.statusCode);
      Alert.alert('Error', errorMessage, [{ text: 'Dismiss' }]);
    }
  };

  const {
    data: boardsData,
    isLoading: boardsIsLoading,
    isError: boardsIsError,
    error: boardsError,
  } = useMondayQuery({
    query: fetchBoardsQuery,
    variables: {},
  });

  const {
    data: columnsData,
    isLoading: columnsIsLoading,
    isError: columnsIsError,
    error: columnsError,
    refetch: refetchColumns,
  } = useMondayQuery({
    queryKey: [selectedBoard?.id || selectedTaskBoard?.id || '', 'columns'],
    query: fetchColumnsQuery,
    variables: { boardId: selectedBoard?.id || selectedTaskBoard?.id || '' },
    enabled: !!selectedBoard?.id || !!selectedTaskBoard?.id,
  });

  const {
    data: itemsData,
    isLoading: itemIsLoading,
    isError: itemsIsError,
    error: itemsError,
    refetch: refetchItems,
  } = useMondayQuery({
    queryKey: [selectedBoard?.id || '', 'items'],
    query: fetchItemsQuery,
    variables: { boardId: selectedBoard?.id || '' },
    enabled: !!selectedBoard?.id,
  });

  useEffect(() => {
    if (boardsIsLoading || !boardsData) {
      return;
    }
    if (boardsIsError) {
      showAlert(boardsError);
      return;
    }
    if (!boardsData.boards) return;

    const boards: Board[] = boardsData.boards.filter((board): board is Board => board !== null);

    setBoards(boards);

    if (boards.length === 1) {
      setSelectedBoard(boards[0]);
    }
    setBoardSelectItems(
      boards.map(board => ({
        label: board.name,
        value: board.id,
      })),
    );
  }, [boardsData, boardsError, boardsIsError, boardsIsLoading]);

  useEffect(() => {
    if (columnsIsLoading) {
      return;
    }
    if (columnsIsError) {
      showAlert(columnsError);
      return;
    }

    if (
      !columnsData ||
      !columnsData.boards ||
      !columnsData.boards[0] ||
      !columnsData.boards[0].columns
    )
      return;

    const columns: Column[] = columnsData.boards[0].columns.filter(
      (column): column is Column => column !== null,
    );

    setColumns(columns);

    setColumnSelectItems(
      columns.map(column => ({
        label: column.title,
        value: column.id,
      })),
    );
    if (selectedTaskBoard) {
      if (columns.length === 0) {
        setSelectedTaskColumn(null);
      } else if (columns.length === 1) {
        setSelectedTaskColumn(columns[0]);
      }
    } else if (selectedBoard) {
      if (columns.length === 0) {
        setSelectedColumn(null);
      } else if (columns.length === 1) {
        setSelectedColumn(columns[0]);
      }
    }
  }, [columnsData, columnsError, columnsIsError, columnsIsLoading]);

  useEffect(() => {
    if (itemIsLoading) {
      return;
    }
    if (itemsIsError) {
      showAlert(itemsError);
      return;
    }

    if (!itemsData || !itemsData.boards || !itemsData.boards[0]) return;
    const items = itemsData.boards[0]?.items_page.items;
    setItems(items);

    if (items.length === 0) {
      setSelectedItem(null);
    }

    setItemSelectItems(
      items.map(item => ({
        label: item.name,
        value: item.id,
      })),
    );
    if (columns.length === 0) {
      setSelectedColumn(null);
    } else if (items.length === 1) {
      setSelectedItem(items[0]);
    }
  }, [columns.length, itemIsLoading, itemsData, itemsError, itemsIsError]);

  useEffect(() => {
    if (board) {
      setSelectedBoard(board);
    }
    if (column) {
      setSelectedColumn(column);
    }
    if (item) {
      setSelectedItem(item);
    }
  }, [board, column, item]);

  return {
    boards,
    columns,
    items,
    selectedBoard,
    setSelectedBoard,
    selectedColumn,
    setSelectedColumn,
    selectedItem,
    setSelectedItem,
    selectedTaskBoard,
    setSelectedTaskBoard,
    selectedTaskColumn,
    setSelectedTaskColumn,
    boardSelectItems,
    columnSelectItems,
    itemSelectItems,
    boardsIsLoading,
    columnsIsLoading,
    itemIsLoading,
    refetchColumns,
    refetchItems,
  };
};

export default useLocationItemSelects;
