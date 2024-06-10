import { ToastAndroid, View } from 'react-native';
import { useSettingsStore } from '~/store';
import { SimpleSelect } from './SimpleSelect';
import { useLocationItemSelects } from '~/hooks';
import SimpleAlertDialog from './SimpleAlertDialog';
import { Button } from './ui/button';
import { Text } from './ui/text';

export default function DescriptionColumnSelect() {
  const {
    descriptionColumns,
    descriptionColumnSelectItems,
    selectedDescriptionColumn,
    setSelectedDescriptionColumn,
    descriptionColumnsIsLoading,
  } = useLocationItemSelects();
  const { setDescriptionColumnId } = useSettingsStore();

  const saveDescriptionColumn = () => {
    if (!selectedDescriptionColumn) {
      ToastAndroid.show('Please select a board and column!', ToastAndroid.SHORT);
      return;
    }
    setDescriptionColumnId(selectedDescriptionColumn.id);

    ToastAndroid.show('Descrption column saved!', ToastAndroid.SHORT);
  };

  return (
    <View className="items-center justify-center m-10 gap-7">
      <SimpleSelect
        options={descriptionColumnSelectItems}
        placeholder={
          selectedDescriptionColumn ? selectedDescriptionColumn.title : 'Description Column Select'
        }
        disabled={false}
        isLoading={descriptionColumnsIsLoading}
        selectedValue={
          selectedDescriptionColumn
            ? { label: selectedDescriptionColumn.title, value: selectedDescriptionColumn.id }
            : null
        }
        onValueChange={newColumn => {
          setSelectedDescriptionColumn(
            descriptionColumns.find(column => column.id === newColumn?.value) || null,
          );
        }}
      />
      <SimpleAlertDialog
        trigger={
          <Button className="m-3" disabled={!selectedDescriptionColumn}>
            <Text>Save</Text>
          </Button>
        }
        actionIfConfirmed={saveDescriptionColumn}
        title="Are you sure?"
        description="Check if the selected item is correct. you may update the wrong item if you continue."
      />
    </View>
  );
}
