import { router, Stack } from 'expo-router';
import { useState } from 'react';
import { Button, FontLanguage, Text, View, XStack, YStack } from 'tamagui';

import { Container } from '~/components/Container';
import { SelectBottomDrawer } from '~/components/SelectBottomDrawer';

export default function Two() {
  const [selectedBoard, setSelectedBoard] = useState('');
  const [selectedColumn, setSelectedColumn] = useState('');
  const [selectedItem, setSelectedItem] = useState('');

  const boardSelectItems = boards.map(board => ({
    name: board.name,
    value: board.board_id,
  }));
  const columnSelectItems = columns.map(column => ({
    name: column.name,
    value: column.column_id,
  }));
  const itemSelectItems = items.map(item => ({
    name: item.name,
    value: item.item_id,
  }));
  return (
    <>
      <Stack.Screen options={{ title: 'Onboarding Two', headerShown: false }} />
      <Container>
        <View alignContent="center" alignItems="center">
          <YStack gap="$4" alignItems="center">
            <Text textAlign="center" color="blue" fontSize={40}>
              Location Board Selection
            </Text>
            <Text color="black">Description</Text>
          </YStack>
          <YStack gap="$4" alignItems="center">
            <SelectBottomDrawer
              items={boardSelectItems}
              placeholder="Board Select"
              selectedValue={selectedBoard}
              onValueChange={board => {
                setSelectedBoard(board);
                console.log(selectedBoard);
              }}
            />
            <SelectBottomDrawer
              items={columnSelectItems}
              placeholder="Column Select"
              selectedValue={selectedColumn}
              onValueChange={column => {
                setSelectedColumn(column);
                console.log(selectedColumn);
              }}
            />
            <SelectBottomDrawer
              items={itemSelectItems}
              placeholder="Item Select"
              selectedValue={selectedItem}
              onValueChange={item => {
                setSelectedItem(item);
                console.log(selectedItem);
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

const boards = [
  { name: 'TestBoard1', board_id: '1test_board' },
  { name: 'TestBoard2', board_id: '2test_board' },
  { name: 'TestBoard3', board_id: '3test_board' },
];

const columns = [
  { name: 'TestColumn1', column_id: '1' },
  { name: 'TestColumn2', column_id: '2' },
  { name: 'TestColumn3', column_id: '3' },
];

const items = [
  { name: 'TestItem1', item_id: '1' },
  { name: 'TestItem2', item_id: '2' },
  { name: 'TestItem3', item_id: '3' },
];
