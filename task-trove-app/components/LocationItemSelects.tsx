import { useEffect, useRef, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';
import { SelectBottomDrawer } from './SelectBottomDrawer';
import { Button, YStack } from 'tamagui';
import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';

export default function LocationItemSelects() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board>({} as Board);
  const [selectedColumn, setSelectedColumn] = useState<Column>({} as Column);
  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);

  const boardSelectItemsRef = useRef<{ name: string; value: string }[]>([]);
  const columnSelectItemsRef = useRef<{ name: string; value: string }[]>([]);
  const itemSelectItemsRef = useRef<{ name: string; value: string }[]>([]);

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
      name: board.name,
      value: board.id,
    }));
  }, [boards]);

  useEffect(() => {
    columnSelectItemsRef.current = columns.map(column => ({
      name: column.title,
      value: column.id,
    }));
    itemSelectItemsRef.current = items.map(item => ({
      name: item.name,
      value: item.id,
    }));
  }, [columns, items]);

  const handleBoardChange = async (board: Board) => {
    setSelectedBoard(board);
    const retrievedColumns = await fetchLocationColumns(board.id);
    const retrievedItems = await fetchItems(board.id);
    setColumns(retrievedColumns);
    setItems(retrievedItems);
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
  };

  return (
    <YStack gap="$4" alignItems="center">
      <SelectBottomDrawer
        items={boardSelectItemsRef.current}
        placeholder="Board Select"
        selectedValue={selectedBoard.name}
        onValueChange={boardId => {
          handleBoardChange(boards.find(board => board.id === boardId) || ({} as Board));
          setSelectedColumn({} as Column);
          setSelectedItem({} as Item);
        }}
      />
      <SelectBottomDrawer
        items={columnSelectItemsRef.current}
        placeholder="Column Select"
        selectedValue={selectedColumn.title}
        disabled={!selectedBoard.id}
        onValueChange={columnID => {
          setSelectedColumn(columns.find(column => column.id === columnID) || ({} as Column));
          setSelectedItem({} as Item);
        }}
      />

      <SelectBottomDrawer
        items={itemSelectItemsRef.current}
        disabled={!selectedColumn.id}
        placeholder="Item Select"
        selectedValue={selectedItem.name}
        onValueChange={itemId => {
          setSelectedItem(items.find(item => item.id === itemId) || ({} as Item));
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
