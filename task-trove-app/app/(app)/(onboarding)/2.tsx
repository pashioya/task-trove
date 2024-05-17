import { router, Stack } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { Button, Text, View, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { SelectBottomDrawer } from '~/components/SelectBottomDrawer';
import SettingsContext from '~/contexts/SettingsContext';
import type { Board, Column, Item } from '~/model/types';
import { mondayColors } from '~/tamagui.config';
import { fetchBoards, fetchItems, fetchLocationColumns } from '~/utils/MondayAPI';

export default function Two() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [items, setItems] = useState<Item[]>([]);

  const [selectedBoard, setSelectedBoard] = useState<Board>({} as Board);
  const [selectedColumn, setSelectedColumn] = useState<Column>({} as Column);
  const [selectedItem, setSelectedItem] = useState<Item>({} as Item);

  const { setBoard, setColumn, setItem } = useContext(SettingsContext);

  const showErrorAlert = (error: Error) => {
    Alert.alert('Error fetching boards: ', error.message, [{ text: 'OK' }]);
  };

  useEffect(() => {
    fetchBoards()
      .then(data => {
        setBoards(data);
      })
      .catch(error => {
        if (error instanceof Error) {
          showErrorAlert(error);
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
    if (selectedBoard.id === '' || selectedColumn.id === '' || selectedItem.id === '') {
      showErrorAlert(new Error('Please select a board, column, and item to save'));
    } else {
      setBoard(selectedBoard);
      setColumn(selectedColumn);
      setItem(selectedItem);
      router.replace('/');
    }
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
        <View>
          <YStack gap="$4" alignItems="center" height="40%" marginTop={160}>
            <Text textAlign="center" color={mondayColors.mondayPurple} fontSize={40}>
              Location Board Selection
            </Text>
            <Text color="black">Where would you like to save your location</Text>
          </YStack>
          <YStack gap="$4" alignItems="center">
            <SelectBottomDrawer
              items={boardSelectItems}
              placeholder="Board Select"
              selectedValue={selectedBoard.name}
              onValueChange={boardId => {
                handleBoardChange(boards.find(board => board.id === boardId) || ({} as Board));
              }}
            />
            {/* if selected board isnt set dont show  */}

            <SelectBottomDrawer
              items={columnSelectItems}
              placeholder="Column Select"
              selectedValue={selectedColumn.title}
              disabled={!selectedBoard.id}
              onValueChange={columnID => {
                setSelectedColumn(columns.find(column => column.id === columnID) || ({} as Column));
              }}
            />

            <SelectBottomDrawer
              items={itemSelectItems}
              disabled={!selectedColumn.id}
              placeholder="Item Select"
              selectedValue={selectedItem.name}
              onValueChange={itemId => {
                setSelectedItem(items.find(item => item.id === itemId) || ({} as Item));
              }}
            />
          </YStack>
          <XStack marginTop={20} gap="$4" justifyContent="center">
            <Button onPress={() => router.push('/(app)/(onboarding)/1')}>Back</Button>
            <Button
              backgroundColor={!selectedItem.id ? 'gray' : 'black'}
              onPress={saveChanges}
              disabled={!selectedItem.id}
            >
              Finish
            </Button>
          </XStack>
        </View>
      </Container>
    </>
  );
}
