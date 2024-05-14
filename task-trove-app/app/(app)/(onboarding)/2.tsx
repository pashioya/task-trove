import { router, Stack } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Button, Text, View, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { SelectBottomDrawer } from '~/components/SelectBottomDrawer';
import SettingsContext from '~/contexts/SettingsContext';
import type { Board, Column, Item } from '~/model/types';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

export default function Two() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board>({} as Board);
  const [selectedColumn, setSelectedColumn] = useState<Column>({} as Column);
  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);

  const { setBoard, setColumn, setItem } = useContext(SettingsContext);

  const showTrackingErrorAlert = (error: Error) => {
    Alert.alert('Location Tracking Error: ', error.message, [{ text: 'OK' }]);
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

    if (retrievedColumns.length === 0) {
      console.log('No columns found');
    }
    if (retrievedItems.length === 0) {
      console.log('No items found');
    }
    setItems(retrievedItems);
  };

  const saveChanges = () => {
    setBoard(selectedBoard);
    setColumn(selectedColumn);
    setItem(selectedItem);
    console.log('Changes saved!');
    router.replace('/');
  };

  const boardSelectItems = boards.map(board => ({
    name: board.name,
    value: board.id,
  }));
  const columnSelectItems = columns.map(column => ({
    name: column.title,
    value: column.id,
  }));
  const itemSelectItems = items.map(item => ({
    name: item.name,
    value: item.id,
  }));
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two', headerShown: false }} />
      <Container>
        <View alignContent="center" alignItems="center">
          <YStack gap="$4" alignItems="center" marginTop={50}>
            <Text textAlign="center" color="blue" fontSize={40}>
              Location Board Selection
            </Text>
            <Text marginTop={40} color="black">
              Where would you like to save your location
            </Text>
          </YStack>
          <YStack gap="$4" alignItems="center" marginTop={150}>
            <SelectBottomDrawer
              items={boardSelectItems}
              placeholder="Board Select"
              selectedValue={selectedBoard.name}
              onValueChange={boardId => {
                handleBoardChange(boards.find(board => board.id === boardId) || ({} as Board));
              }}
            />
            {/* if selected board isnt set dont show  */}
            {selectedBoard.id && (
              <SelectBottomDrawer
                items={columnSelectItems}
                placeholder="Column Select"
                selectedValue={selectedColumn.title}
                onValueChange={columnID => {
                  setSelectedColumn(
                    columns.find(column => column.id === columnID) || ({} as Column),
                  );
                }}
              />
            )}

            {selectedColumn.id && (
              <SelectBottomDrawer
                items={itemSelectItems}
                placeholder="Item Select"
                selectedValue={selectedItem.name}
                onValueChange={itemId => {
                  setSelectedItem(items.find(item => item.id === itemId) || ({} as Item));
                }}
              />
            )}
          </YStack>
          <XStack marginTop={20} gap="$4" justifyContent="center">
            <Button onPress={() => router.push('/1')}>Back</Button>
            <Button onPress={saveChanges} disabled={!selectedItem.id}>
              Finish
            </Button>
          </XStack>
        </View>
      </Container>
    </>
  );
}
