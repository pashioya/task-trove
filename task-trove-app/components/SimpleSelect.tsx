import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { ActivityIndicator, View } from 'react-native';

type Option = { label: string; value: string };

type SimpleSelectProps = {
  options: Option[];
  disabled: boolean;
  isLoading?: boolean;
  selectedValue: Option | null;
  onValueChange: (v: Option | null) => void;
  placeholder: string;
};

export function SimpleSelect({
  options,
  disabled,
  isLoading = true,
  selectedValue,
  onValueChange,
  placeholder,
}: SimpleSelectProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <Select
      value={selectedValue ? selectedValue : undefined}
      onValueChange={value => {
        const selectedOption = options.find(option => option.value === value?.value) || null;
        onValueChange(selectedOption);
      }}
      disabled={disabled}
    >
      <SelectTrigger disabled={disabled} className="w-[250px]">
        <SelectValue className="text-foreground text-sm native:text-lg" placeholder={placeholder} />
      </SelectTrigger>

      <SelectContent insets={contentInsets} className="w-[250px] max-h-[250px] overflow-hidden">
        <SelectLabel>{placeholder}</SelectLabel>
        <SelectGroup>
          {isLoading ? (
            <View className="flex items-center justify-center h-full">
              <ActivityIndicator />
            </View>
          ) : options.length === 0 ? (
            <SelectItem disabled key="empty" label="No Options Available" value="" />
          ) : (
            <FlatList
              data={options}
              keyExtractor={item => item.value}
              renderItem={({ item }) => (
                <SelectItem key={item.value} label={item.label} value={item.value}>
                  {item.label}
                </SelectItem>
              )}
            />
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
