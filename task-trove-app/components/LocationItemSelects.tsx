import { useEffect, useRef, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';

import { Button, YStack } from 'tamagui';
import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
import { CustomAutomateSelect } from './CustomAutomateSelect';
import { Alert, KeyboardAvoidingView } from 'react-native';
import * as Burnt from 'burnt';
import { useMondayQuery } from '~/lib/monday/api';
import { fetchBoardsQuery, fetchColumnsQuery, fetchItemsQuery } from '~/lib/monday/queries';
import type { MondayAPIError } from '~/lib/monday/error';

export default function LocationItemSelects() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedColumn, setSelectedColumn] = useState<Column | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  const boardSelectItemsRef = useRef<{ label: string; value: string }[]>([]);
  const columnSelectItemsRef = useRef<{ label: string; value: string }[]>([]);
  const itemSelectItemsRef = useRef<{ label: string; value: string }[]>([]);

  const { setBoard, setColumn, setItem, board, column, item } = useSettingsStore();

  const { toggleShareLocation, isTracking } = useToggleShareLocation();

  const showAlert = (error: MondayAPIError) => {
    Alert.alert('Error', error.message, [{ text: 'Dismiss' }]);
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
      boardSelectItemsRef.current = boards.map(board => ({
        label: board.name,
        value: board.id,
      }));
    }
  }, [boardsData, boardsError, boardsIsError, boardsIsLoading]);

  useEffect(() => {
    if (!columnsIsLoading) {
      if (columnsIsError) {
        showAlert(columnsError);
      }

      if (!columnsData || !columnsData.boards || !columnsData.boards[0]) return;

      const columns = columnsData.boards[0].columns as Column[];
      setColumns(columns);

      columnSelectItemsRef.current = columns.map(column => ({
        label: column.title,
        value: column.id,
      }));

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
      const items = itemsData.boards[0].items_page.items as Item[];
      setItems(items);

      itemSelectItemsRef.current = items.map(item => ({
        label: item.name,
        value: item.id,
      }));

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
    columnSelectItemsRef.current = columns.map(column => ({
      label: column.title,
      value: column.id,
    }));
    itemSelectItemsRef.current = items.map(item => ({
      label: item.name,
      value: item.id,
    }));
    if (columns.length === 1) {
      setSelectedColumn(columns[0]);
    }
    if (items.length === 1) {
      setSelectedItem(items[0]);
    }
  }, [columns, items]);

  const handleBoardChange = async (board: Board) => {
    setSelectedBoard(null);
    setSelectedBoard(board);
    setSelectedColumn({} as Column);
    setSelectedItem({} as Item);

    await refetchColumns();
    await refetchItems();
  };

  const saveChanges = () => {
    if (selectedBoard?.id && selectedColumn?.id && selectedItem?.id) {
      if (isTracking) {
        toggleShareLocation();
        setBoard(selectedBoard);
        setColumn(selectedColumn);
        setItem(selectedItem);
        toggleShareLocation();
      } else {
        setBoard(selectedBoard);
        setColumn(selectedColumn);
        setItem(selectedItem);
      }
      Burnt.toast({
        title: 'Location Item Changed!',
        message: "You've successfully changed the location item.",
        preset: 'done',
        layout: {
          iconSize: {
            width: 25,
            height: 25,
          },
        },
      });
    }
  };

  return (
    <YStack alignItems="center">
      <KeyboardAvoidingView style={{ gap: 10 }}>
        <CustomAutomateSelect
          options={boardSelectItemsRef.current}
          placeholder="Board Select"
          selectedValue={
            selectedBoard ? { label: selectedBoard.name, value: selectedBoard.id } : null
          }
          disabled={false}
          onValueChange={boardId => {
            handleBoardChange(boards.find(board => board.id === boardId?.value) || ({} as Board));
          }}
        />
        <CustomAutomateSelect
          options={columnSelectItemsRef.current}
          placeholder="Column Select"
          disabled={!selectedBoard}
          selectedValue={
            selectedColumn ? { label: selectedColumn.title, value: selectedColumn.id } : null
          }
          onValueChange={newColumn => {
            setSelectedColumn(
              columns.find(column => column.id === newColumn?.value) || ({} as Column),
            );
          }}
        />

        <CustomAutomateSelect
          options={itemSelectItemsRef.current}
          placeholder="Item Select"
          selectedValue={selectedItem ? { label: selectedItem.name, value: selectedItem.id } : null}
          disabled={!selectedColumn}
          onValueChange={newItem => {
            setSelectedItem(items.find(item => item.id === newItem?.value) || ({} as Item));
          }}
        />
        <Button
          backgroundColor={!selectedItem ? 'gray' : 'black'}
          onPress={saveChanges}
          disabled={!selectedItem}
        >
          Save
        </Button>
      </KeyboardAvoidingView>
    </YStack>
  );
}
