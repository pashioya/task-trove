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
    taskColumns,
    setSelectedBoard,
    selectedTaskBoard,
    selectedTaskColumn,
    setSelectedTaskBoard,
    setSelectedTaskColumn,
    boardSelectItems,
    taskColumnSelectItems,
    boardsIsLoading,
    columnsIsLoading,
    refetchTaskColumns,
  } = useLocationItemSelects();

  const { taskBoard, taskColumn, setTaskBoard, setTaskColumn } = useSettingsStore();

  const handleTaskBoardChange = async (board: Board) => {
    console.log('Selected board:', board);
    setSelectedBoard(null);
    setSelectedTaskBoard(board);
    setSelectedTaskColumn(null);

    console.log('current board:', taskBoard);

    await refetchTaskColumns();

    console.log('columns:', taskColumns);
    console.log(' ');
  };

  const saveTaskColumn = () => {
    if (!selectedTaskBoard || !selectedTaskColumn) {
      ToastAndroid.show('Please select a board and column!', ToastAndroid.SHORT);
      return;
    }
    setTaskBoard(selectedTaskBoard);
    setTaskColumn(selectedTaskColumn);

    ToastAndroid.show('Task board saved!', ToastAndroid.SHORT);
  };

  return (
    <View className="items-center justify-center m-10 gap-7">
      <SimpleSelect
        options={boardSelectItems}
        placeholder="Board Select"
        selectedValue={
          selectedTaskBoard ? { label: selectedTaskBoard.name, value: selectedTaskBoard.id } : null
        }
        isLoading={boardsIsLoading}
        disabled={false}
        onValueChange={newBoard => {
          const board = boards.find(board => board.id === newBoard?.value) || null;
          if (board) handleTaskBoardChange(board);
        }}
      />
      <SimpleSelect
        options={taskColumnSelectItems}
        placeholder={selectedTaskColumn ? selectedTaskColumn.title : 'Column Select'}
        disabled={!selectedTaskBoard}
        isLoading={columnsIsLoading}
        selectedValue={
          selectedTaskColumn
            ? { label: selectedTaskColumn.title, value: selectedTaskColumn.id }
            : null
        }
        onValueChange={newColumn => {
          setSelectedTaskColumn(taskColumns.find(column => column.id === newColumn?.value) || null);
        }}
      />
      <SimpleAlertDialog
        trigger={
          <Button className="m-3" disabled={!selectedTaskColumn}>
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
