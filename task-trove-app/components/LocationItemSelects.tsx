import { router } from 'expo-router';
import { useContext, useEffect, useRef, useState } from 'react';
import SettingsContext from '~/contexts/SettingsContext';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

import { Button, YStack } from 'tamagui';
import { CustomAutomateSelect } from './CustomAutomateSelect';

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

  const { setBoard, setColumn, setItem } = useContext(SettingsContext);

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
    columnSelectItemsRef.current = columns.map(column => ({
      label: column.title,
      value: column.id,
    }));
    itemSelectItemsRef.current = items.map(item => ({
      label: item.name,
      value: item.id,
    }));
    autoSelect();
  }, [columns, items]);

  function autoSelect() {
    if (boards.length === 1) {
      setSelectedBoard(boards[0]);
    }
    if (!selectedColumn.id && columns.length === 1) {
      setSelectedColumn(columns[0]);
    }
    if (!selectedItem.id && items.length === 1) {
      setSelectedItem(items[0]);
    }
  }

  const handleBoardChange = async (board: Board) => {
    setSelectedBoard(board);
    setColumns(await fetchLocationColumns(board.id));
    setItems(await fetchItems(board.id));
  };

  const saveChanges = () => {
    setBoard(selectedBoard);
    setColumn(selectedColumn);
    setItem(selectedItem);

    router.replace('/');
  };

  return (
    <YStack gap="$4" alignItems="center">
      <CustomAutomateSelect
        options={boardSelectItemsRef.current}
        placeholder="Board Select"
        selectedValue={{ label: selectedBoard.name, value: selectedBoard.id }}
        onValueChange={async boardId => {
          await handleBoardChange(
            boards.find(board => board.id === boardId?.value) || ({} as Board),
          );
          setSelectedColumn({} as Column);
          setSelectedItem({} as Item);
        }}
      />
      <CustomAutomateSelect
        options={columnSelectItemsRef.current}
        placeholder="Column Select"
        selectedValue={{ label: selectedColumn.title, value: selectedColumn.id }}
        onValueChange={newBoard => {
          setSelectedColumn(
            columns.find(column => column.id === newBoard?.value) || ({} as Column),
          );
          autoSelect();
        }}
      />

      <CustomAutomateSelect
        options={itemSelectItemsRef.current}
        placeholder="Item Select"
        selectedValue={{ label: selectedItem.name, value: selectedItem.id }}
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
    </YStack>
  );
}
