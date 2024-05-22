import { useEffect, useRef, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

import { Button, YStack } from 'tamagui';
import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
import { CustomAutomateSelect } from './CustomAutomateSelect';
import { KeyboardAvoidingView } from 'react-native';

export default function LocationItemSelects() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board>({} as Board);
  const [selectedColumn, setSelectedColumn] = useState<Column>({} as Column);
  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);

  const boardSelectItemsRef = useRef<{ label: string; value: string }[]>([]);
  const columnSelectItemsRef = useRef<{ label: string; value: string }[]>([]);
  const itemSelectItemsRef = useRef<{ label: string; value: string }[]>([]);

  const { setBoard, setColumn, setItem } = useSettingsStore();

  const { toggleShareLocation, isTracking } = useToggleShareLocation();

  useEffect(() => {
    fetchBoards()
      .then(data => {
        setBoards(data);
        boardSelectItemsRef.current = data.map(board => ({
          name: board.name,
          value: board.id,
        }));
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });
  }, []);

  useEffect(() => {
    fetchBoards()
      .then(data => {
        setBoards(data);
      })
      .catch(error => {
        console.error('Error fetching boards:', error);
      });
    boardSelectItemsRef.current = boards.map(board => ({
      label: board.name,
      value: board.id,
    }));
  }, [boards]);

  useEffect(() => {
    if (board.id) {
      setSelectedBoard(board);
    }
    if (column.id) {
      setSelectedColumn(column);
    }
    if (item.id) {
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
    setSelectedBoard(board);
    setColumns(await fetchLocationColumns(board.id));
    setItems(await fetchItems(board.id));
    setSelectedColumn({} as Column);
    setSelectedItem({} as Item);
  };

  const saveChanges = () => {
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
    console.log('Changes saved!');
    setBoard(selectedBoard);
    setColumn(selectedColumn);
    setItem(selectedItem);

    router.replace('/');
  };

  return (
    <YStack alignItems="center">
      <KeyboardAvoidingView style={{ gap: 10 }}>
        <CustomAutomateSelect
          options={boardSelectItemsRef.current}
          placeholder="Board Select"
          selectedValue={
            selectedBoard.id ? { label: selectedBoard.name, value: selectedBoard.id } : null
          }
          disabled={false}
          onValueChange={async boardId => {
            await handleBoardChange(
              boards.find(board => board.id === boardId?.value) || ({} as Board),
            );
          }}
        />
        <CustomAutomateSelect
          options={columnSelectItemsRef.current}
          placeholder="Column Select"
          disabled={!selectedBoard.id}
          selectedValue={
            selectedColumn.id ? { label: selectedColumn.title, value: selectedColumn.id } : null
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
          selectedValue={
            selectedItem.id ? { label: selectedItem.name, value: selectedItem.id } : null
          }
          disabled={!selectedColumn.id}
          onValueChange={newItem => {
            setSelectedItem(items.find(item => item.id === newItem?.value) || ({} as Item));
          }}
        />
        <Button
          backgroundColor={!selectedItem.id ? 'gray' : 'black'}
          onPress={saveChanges}
          disabled={!selectedItem.id}
        >
          Save
        </Button>
      </KeyboardAvoidingView>
    </YStack>
  );
}
