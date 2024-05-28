import { useEffect, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';

import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchBoardsQuery, fetchColumnsQuery, fetchItemsQuery } from '~/lib/monday/queries';
import type { MondayAPIError } from '~/lib/monday/error';
import { handleMondayErrorCode, handleMondayErrorStatusCode } from '~/utils/MondayErrorHandling';
import { SimpleSelect } from './SimpleSelect';
import { Button } from './ui/button';
import { Text } from './ui/text';
import SimpleAlertDialog from './SimpleAlertDialog';
import { Alert, ToastAndroid, View } from 'react-native';

export default function LocationItemSelects() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const [boardSelectItems, setBoardSelectItems] = useState<{ label: string; value: string }[]>([]);
  const [columnSelectItems, setColumnSelectItems] = useState<{ label: string; value: string }[]>(
    [],
  );
  const [itemSelectItems, setItemSelectItems] = useState<{ label: string; value: string }[]>([]);

  const { setBoard, setColumn, setItem, board, column, item } = useSettingsStore();
  const { isTracking } = useToggleShareLocation();

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
    queryKey: [selectedBoard?.id || '', 'columns'],
    query: fetchColumnsQuery,
    variables: { boardId: selectedBoard?.id || '' },
    enabled: !!selectedBoard?.id,
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
    if (!boardsIsLoading && boardsData) {
      if (boardsIsError) {
        showAlert(boardsError);
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
    }
  }, [boardsData, boardsError, boardsIsError, boardsIsLoading]);

  useEffect(() => {
    if (!columnsIsLoading) {
      if (columnsIsError) {
        showAlert(columnsError);
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
      if (columns.length === 1) {
        setSelectedColumn(columns[0]);
      }
    }
  }, [columnsData, columnsError, columnsIsError, columnsIsLoading]);

  useEffect(() => {
    if (!itemIsLoading) {
      if (itemsIsError) {
        showAlert(itemsError);
      }

      if (!itemsData || !itemsData.boards || !itemsData.boards[0]) return;
      const items = itemsData.boards[0]?.items_page.items;
      setItems(items);

      setItemSelectItems(
        items.map(item => ({
          label: item.name,
          value: item.id,
        })),
      );
      if (items.length === 1) {
        setSelectedItem(items[0]);
      }
    }
  }, [itemIsLoading, itemsData, itemsError, itemsIsError]);

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

  useEffect(() => {
    setColumnSelectItems(
      columns.map(column => ({
        label: column.title,
        value: column.id,
      })),
    );
    setItemSelectItems(
      items.map(item => ({
        label: item.name,
        value: item.id,
      })),
    );
    if (columns.length === 1) {
      setSelectedColumn(columns[0]);
    }
    if (items.length === 1) {
      setSelectedItem(items[0]);
    }
  }, [columns, items]);

  const handleBoardChange = async (board: Board) => {
    setSelectedBoard(board);
    setSelectedColumn(null);
    setSelectedItem(null);

    await refetchColumns();
    await refetchItems();
  };

  const saveChanges = () => {
    if (selectedBoard && selectedColumn && selectedItem) {
      if (isTracking) {
        setBoard(selectedBoard);
        setColumn(selectedColumn);
        setItem(selectedItem);
      } else {
        setBoard(selectedBoard);
        setColumn(selectedColumn);
        setItem(selectedItem);
      }
      ToastAndroid.show('Location saved!', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="items-center justify-center m-10 gap-7">
      <SimpleSelect
        options={boardSelectItems}
        placeholder="Board Select"
        selectedValue={
          selectedBoard ? { label: selectedBoard.name, value: selectedBoard.id } : null
        }
        isLoading={boardsIsLoading}
        disabled={false}
        onValueChange={newBoard => {
          const board = boards.find(board => board.id === newBoard?.value) || null;
          if (board) handleBoardChange(board);
        }}
      />
      <SimpleSelect
        options={columnSelectItems}
        placeholder="Column Select"
        disabled={!selectedBoard}
        isLoading={columnsIsLoading}
        selectedValue={
          selectedColumn ? { label: selectedColumn.title, value: selectedColumn.id } : null
        }
        onValueChange={newColumn => {
          setSelectedColumn(columns.find(column => column.id === newColumn?.value) || null);
        }}
      />
      <SimpleSelect
        options={itemSelectItems}
        placeholder="Item Select"
        isLoading={itemIsLoading}
        selectedValue={selectedItem ? { label: selectedItem.name, value: selectedItem.id } : null}
        disabled={!selectedColumn || !selectedBoard}
        onValueChange={newItem => {
          setSelectedItem(items.find(item => item.id === newItem?.value) || null);
        }}
      />
      <SimpleAlertDialog
        trigger={
          <Button className="w-full" disabled={!selectedItem}>
            <Text>Save</Text>
          </Button>
        }
        actionIfConfirmed={saveChanges}
        title="Are you sure?"
        description="Check if the selected item is correct. you may update the wrong item if you continue."
      />
    </View>
  );
}
