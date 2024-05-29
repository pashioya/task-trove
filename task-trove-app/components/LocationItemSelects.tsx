import { SimpleSelect } from './SimpleSelect';
import { Button } from './ui/button';
import { Text } from './ui/text';
import SimpleAlertDialog from './SimpleAlertDialog';
import { ToastAndroid, View } from 'react-native';
import { useLocationItemSelects } from '~/hooks';
import type { Board } from '~/model/types';
import { useSettingsStore } from '~/store';

export default function LocationItemSelects() {
  const {
    boards,
    columns,
    items,
    setSelectedTaskBoard,
    selectedBoard,
    selectedColumn,
    setSelectedBoard,
    setSelectedColumn,
    selectedItem,
    setSelectedItem,
    boardSelectItems,
    columnSelectItems,
    itemSelectItems,
    boardsIsLoading,
    columnsIsLoading,
    itemIsLoading,
    refetchColumns,
    refetchItems,
  } = useLocationItemSelects();

  const { setBoard, setColumn } = useSettingsStore();

  const handleBoardChange = async (board: Board) => {
    setSelectedTaskBoard(null);
    setSelectedBoard(board);
    setSelectedColumn(null);
    setSelectedItem(null);

    await refetchColumns();
    await refetchItems();
  };

  const saveChanges = () => {
    if (!selectedBoard || !selectedColumn || !selectedItem) {
      ToastAndroid.show('Please select a board, column, and item!', ToastAndroid.SHORT);
      return;
    }
    setBoard(selectedBoard);
    setColumn(selectedColumn);

    ToastAndroid.show('Location saved!', ToastAndroid.SHORT);
  };

  return (
    <View className="items-center justify-center m-10 gap-7">
      <SimpleSelect
        options={boardSelectItems}
        placeholder="Board Select"
        selectedValue={
          selectedBoard ? { label: selectedBoard.name, value: selectedBoard.id } : null
        }
        isLoading={boardsIsLoading}
        disabled={false}
        onValueChange={newBoard => {
          const board = boards.find(board => board.id === newBoard?.value) || null;
          if (board) handleBoardChange(board);
        }}
      />
      <SimpleSelect
        options={columnSelectItems}
        placeholder={selectedColumn ? selectedColumn.title : 'Column Select'}
        disabled={!selectedBoard}
        isLoading={columnsIsLoading}
        selectedValue={
          selectedColumn ? { label: selectedColumn.title, value: selectedColumn.id } : null
        }
        onValueChange={newColumn => {
          setSelectedColumn(columns.find(column => column.id === newColumn?.value) || null);
        }}
      />
      <SimpleSelect
        options={itemSelectItems}
        placeholder={selectedItem ? selectedItem.name : 'Item Select'}
        isLoading={itemIsLoading}
        selectedValue={selectedItem ? { label: selectedItem.name, value: selectedItem.id } : null}
        disabled={!selectedColumn || !selectedBoard}
        onValueChange={newItem => {
          setSelectedItem(items.find(item => item.id === newItem?.value) || null);
        }}
      />
      <SimpleAlertDialog
        trigger={
          <Button className="bg-blue-700 w-full" disabled={!selectedItem}>
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
