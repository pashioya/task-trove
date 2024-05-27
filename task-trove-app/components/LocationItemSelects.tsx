import { useEffect, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
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
  const { toggleShareLocation, isTracking } = useToggleShareLocation();

  useEffect(() => {
    const fetchAndSetBoards = async () => {
      try {
        const data = await fetchBoards();
        setBoards(data);
        if (data.length === 1) {
          setSelectedBoard(data[0]);
        }
        if (data.length === 0) {
          Alert.alert('No boards found', 'Please create a board in Monday.com');
        }
      } catch (error) {
        console.error('Error fetching boards: ', error);
        Alert.alert('Error fetching boards', 'Please try again later');
      }
    };
    fetchAndSetBoards();
  });

  useEffect(() => {
    setBoardSelectItems(
      boards.map(board => ({
        label: board.name,
        value: board.id,
      })),
    );
  }, [boards]);

  useEffect(() => {
    const fetchColumnsAndItems = async () => {
      if (selectedBoard) {
        try {
          const columns = await fetchLocationColumns(selectedBoard.id);
          const items = await fetchItems(selectedBoard.id);
          setColumns(columns);
          setItems(items);
        } catch (error) {
          console.log('Error fetching columns and items: ', error);
          Alert.alert('Error fetching columns and items', 'Please try again later');
        }
      }
    };
    fetchColumnsAndItems();
  }, [selectedBoard]);

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
  }, [columns, items]);

  const handleBoardChange = (board: Board) => {
    setSelectedBoard(board);
    setSelectedColumn(null);
    setSelectedItem(null);
  };

  const saveChanges = () => {
    if (selectedBoard && selectedColumn && selectedItem) {
      setBoard(selectedBoard);
      setColumn(selectedColumn);
      setItem(selectedItem);
      if (isTracking) {
        toggleShareLocation();
      }
      ToastAndroid.show('Location saved!', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="justify-center gap-7 items-center m-10">
      <SimpleSelect
        options={boardSelectItems}
        placeholder="Board Select"
        selectedValue={
          selectedBoard ? { label: selectedBoard.name, value: selectedBoard.id } : null
        }
        isLoading={boards.length === 0 || !selectedBoard}
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
        isLoading={columns.length === 0 && !!selectedBoard}
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
        isLoading={items.length === 0 && !!selectedColumn}
        selectedValue={selectedItem ? { label: selectedItem.name, value: selectedItem.id } : null}
        disabled={!selectedColumn || !selectedBoard}
        onValueChange={newItem => {
          setSelectedItem(items.find(item => item.id === newItem?.value) || null);
        }}
      />
      <SimpleAlertDialog
        trigger={
          <Button className="m-3" disabled={!selectedItem}>
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
