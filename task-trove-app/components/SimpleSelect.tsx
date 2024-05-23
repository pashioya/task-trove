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
import { ScrollView } from 'react-native';

type Option = { label: string; value: string };

type CustomAutomateSelectProps = {
  options: Option[];
  disabled: boolean;
  selectedValue: Option | null;
  onValueChange: (v: Option | null) => void;
  placeholder: string;
};

export function SimpleSelect({
  options,
  disabled,
  selectedValue,
  onValueChange,
  placeholder,
}: CustomAutomateSelectProps) {
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
      <SelectTrigger className="w-[250px]">
        <SelectValue className="text-foreground text-sm native:text-lg" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent insets={contentInsets} className="w-[250px]">
        <SelectGroup>
          <SelectLabel>{placeholder}</SelectLabel>
          <ScrollView>
            {options.map(option => (
              <SelectItem
                delayLongPress={1000}
                key={option.value}
                label={option.label}
                value={option.value}
              >
                {option.label}
              </SelectItem>
            ))}
          </ScrollView>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
