import { Stack, router } from 'expo-router';
import { Text } from 'tamagui';
import { Alert, Button, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { fetchBoards, fetchLocationColumns, fetchItems } from '~/utils/MondayAPI';
import type { Board, Column, Item } from '~/model/Index';

import { Container } from '~/components/Container';
import React, { useEffect, useState, useContext } from 'react';
import SettingsContext from '~/contexts/SettingsContext';

export default function Two() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedboard, setSelectedBoard] = useState<Board>({} as Board);
  const [selectedColumn, setSelectedColumn] = useState<Column>({} as Column);
  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);

  const { setBoard, setColumn, setItem } = useContext(SettingsContext);

  const showTrackingErrorAlert = (e: Error) => {
    Alert.alert('Location Tracking Error', e.message, [{ text: 'OK' }]);
  };

  useEffect(() => {
    fetchBoards()
      .then(data => {
        setBoards(data);
      })
      .catch(error => {
        if (error instanceof Error) {
          showTrackingErrorAlert(error);
        }
        console.error('Error fetching boards:', error);
      });
  }, []);

  const handleBoardChange = async (board: Board) => {
    setSelectedBoard(board);

    const retrievedColumns = await fetchLocationColumns(board.id);
    const retrievedItems = await fetchItems(board.id);

    if (retrievedColumns.length === 1) {
      setSelectedColumn(retrievedColumns[0]);
    }
    setColumns(retrievedColumns);

    if (retrievedItems.length === 1) {
      setSelectedItem(retrievedItems[0]);
    }
    setItems(retrievedItems);
  };

  const saveChanges = () => {
    setBoard(selectedboard);
    setColumn(selectedColumn);
    setItem(selectedItem);
    router.replace('/');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two' }} />
      <Container>
        <View>
          <Text>Select a Monday board and item where you want your location to be synced</Text>
          <Picker
            style={{ flex: 1 }}
            selectedValue={selectedboard.name}
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            onValueChange={(_itemValue, itemIndex) => handleBoardChange(boards[itemIndex])}
          >
            {boards.map(board => (
              <Picker.Item key={board.id} label={board.name} value={board.name} />
            ))}
          </Picker>

          {columns.length > 0 ? (
            <Picker
              style={{ flex: 1 }}
              selectedValue={selectedColumn.title}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onValueChange={(_itemValue, itemIndex) => setSelectedColumn(columns[itemIndex])}
            >
              {columns.map(column => (
                <Picker.Item key={column.id} label={column.title} value={column.title} />
              ))}
            </Picker>
          ) : (
            <Text>No location columns in that table</Text>
          )}
          {items.length > 0 ? (
            <Picker
              style={{ flex: 1 }}
              selectedValue={selectedItem.name}
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              onValueChange={(_itemValue, itemIndex) => setSelectedItem(items[itemIndex])}
            >
              {items.map(item => (
                <Picker.Item key={item.id} label={item.name} value={item.name} />
              ))}
            </Picker>
          ) : (
            <Text>No items in that table</Text>
          )}
          <Button title="Save" onPress={() => saveChanges()} />
        </View>
      </Container>
    </>
  );
}
