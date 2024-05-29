import { ToastAndroid, View } from 'react-native';
import { SimpleSelect } from './SimpleSelect';
import SimpleAlertDialog from './SimpleAlertDialog';
import { useLocationItemSelects } from '~/hooks';
import type { Board } from '~/model/types';
import { Button } from './ui/button';
import { Text } from './ui/text';
import { useSettingsStore } from '~/store';

export default function TaskColumnSelects() {
  const {
    boards,
    columns,
    selectedBoard,
    selectedColumn,
    setSelectedBoard,
    setSelectedColumn,
    boardSelectItems,
    columnSelectItems,
    boardsIsLoading,
    columnsIsLoading,
    refetchColumns,
  } = useLocationItemSelects();

  const { setBoard, setColumn } = useSettingsStore();

  const handleTaskBoardChange = async (board: Board) => {
    setSelectedBoard(board);
    setSelectedColumn(null);

    await refetchColumns();
  };

  const saveTaskColumn = () => {
    if (!selectedBoard || !selectedColumn) {
      ToastAndroid.show('Please select a board and column!', ToastAndroid.SHORT);
      return;
    }
    setBoard(selectedBoard);
    setColumn(selectedColumn);

    ToastAndroid.show('Task board saved!', ToastAndroid.SHORT);
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
          if (board) handleTaskBoardChange(board);
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
      <SimpleAlertDialog
        trigger={
          <Button className="m-3" disabled={!selectedColumn}>
            <Text>Save</Text>
          </Button>
        }
        actionIfConfirmed={saveTaskColumn}
        title="Are you sure?"
        description="Check if the selected item is correct. you may update the wrong item if you continue."
      />
    </View>
  );
}
