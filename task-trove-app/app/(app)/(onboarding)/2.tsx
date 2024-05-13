import { router, Stack } from 'expo-router';
import { useContext } from 'react';
import { Button, Text, View, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { SelectBottomDrawer } from '~/components/SelectBottomDrawer';
import SettingsContext from '~/contexts/SettingsContext';
import type { Board, Column, Item } from '~/model/types';

export default function Two() {
  const { board, column, item, setBoard, setColumn, setItem } = useContext(SettingsContext);

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
              selectedValue={board.name}
              onValueChange={boardId => {
                setBoard(boards.find(board => board.id === boardId) || ({} as Board));
              }}
            />
            <SelectBottomDrawer
              items={columnSelectItems}
              placeholder="Column Select"
              selectedValue={column.title}
              onValueChange={columnID => {
                setColumn(columns.find(column => column.id === columnID) || ({} as Column));
              }}
            />
            <SelectBottomDrawer
              items={itemSelectItems}
              placeholder="Item Select"
              selectedValue={item.name}
              onValueChange={itemId => {
                setItem(items.find(item => item.id === itemId) || ({} as Item));
                console.log('item:', itemId);
              }}
            />
          </YStack>

          <XStack marginTop={20} gap="$4" justifyContent="center">
            <Button onPress={() => router.push('/1')}>Back</Button>
            <Button onPress={() => router.push('/')}>Finish</Button>
          </XStack>
        </View>
      </Container>
    </>
  );
}

const boards: Board[] = [
  { id: 'board_1', name: 'Board 1' },
  { id: 'board_2', name: 'Board 2' },
  { id: 'board_3', name: 'Board 3' },
  { id: 'board_4', name: 'Board 4' },
];

const columns: Column[] = [
  { title: 'TestColumn1', id: 'column_1', type: 'test' },
  { title: 'TestColumn2', id: 'column_2', type: 'test' },
  { title: 'TestColumn3', id: 'column_3', type: 'test' },
];

const items: Item[] = [
  { name: 'TestItem1', id: 'item_1' },
  { name: 'TestItem2', id: 'item_2' },
  { name: 'TestItem3', id: 'item_3' },
];
