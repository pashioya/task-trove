import { useEffect, useRef, useState } from 'react';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

import { useSettingsStore } from '~/store';
import { useToggleShareLocation } from '~/hooks';
import { SimpleSelect } from './SimpleSelect';
import { Button } from './ui/button';
import { Text } from './ui/text';
import SimpleAlertDialog from './SimpleAlertDialog';
import { ToastAndroid, View } from 'react-native';

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
        if (data.length === 1) {
          setSelectedBoard(data[0]);
        }
        if (data.length === 0) {
          console.log('No boards found');
        }
      })
      .catch(error => {
        console.log('Error fetching boards', error);
      });
    boardSelectItemsRef.current = boards.map(board => ({
      label: board.name,
      value: board.id,
    }));
  }, [boards]);

  useEffect(() => {
    async function fetchColumnsAndItems() {
      if (board) {
        setSelectedBoard(board);
        setColumns(await fetchLocationColumns(board.id));
        setItems(await fetchItems(board.id));
      }
    }
    fetchColumnsAndItems();
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
    setSelectedColumn(null);
    setSelectedItem(null);
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
      ToastAndroid.show('Location saved!', ToastAndroid.SHORT);
    }
  };

  return (
    <View className="justify-center gap-7 items-center m-10">
      <SimpleSelect
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
      <SimpleSelect
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

      <SimpleSelect
        options={itemSelectItemsRef.current}
        placeholder="Item Select"
        selectedValue={selectedItem ? { label: selectedItem.name, value: selectedItem.id } : null}
        disabled={!selectedColumn || !selectedBoard}
        onValueChange={newItem => {
          setSelectedItem(items.find(item => item.id === newItem?.value) || ({} as Item));
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
