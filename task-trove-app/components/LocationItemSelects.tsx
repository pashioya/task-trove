import { useEffect, useRef, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

import { Button, YStack } from 'tamagui';
import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
import { CustomAutomateSelect } from './CustomAutomateSelect';
import { KeyboardAvoidingView } from 'react-native';
import * as Burnt from 'burnt';

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

  useEffect(() => {
    fetchBoards()
      .then(data => {
        setBoards(data);
        boardSelectItemsRef.current = data.map(board => ({
          label: board.name,
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
        if (data.length === 1) {
          setSelectedBoard(data[0]);
        }
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
    setSelectedBoard(board);
    setColumns(await fetchLocationColumns(board.id));
    setItems(await fetchItems(board.id));
    setSelectedColumn({} as Column);
    setSelectedItem({} as Item);
  };

  const saveChanges = () => {
    if (selectedBoard && selectedColumn && selectedItem) {
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
          onValueChange={async boardId => {
            await handleBoardChange(
              boards.find(board => board.id === boardId?.value) || ({} as Board),
            );
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