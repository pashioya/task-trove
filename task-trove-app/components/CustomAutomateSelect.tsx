import { Button, Input, ListItem, ScrollView, XGroup, YGroup, YStack } from 'tamagui';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { mondayColors } from '~/tamagui.config';

type Option = { label: string; value: string };

type CustomAutomateSelectProps = {
  options: Option[];
  disabled?: boolean;
  selectedValue?: Option | null;
  onValueChange: (v: null | Option) => void;
  placeholder?: string;
};

export function CustomAutomateSelect({
  options,
  disabled,
  selectedValue,
  onValueChange,
  placeholder,
}: CustomAutomateSelectProps) {
  const [selection, setSelection] = useState<Option | null>(selectedValue ?? null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOptions = searchTerm
    ? options.filter(i => i.label.toLowerCase().includes(searchTerm.toLowerCase()))
    : options;

  const handleSelect = (item: Option) => {
    const newVal = selection?.value === item.value ? null : item;
    setSelection(newVal);
    onValueChange(newVal);
    setPopoverOpen(false);
  };

  const inputPlaceholder = disabled
    ? placeholder
    : selection?.label
      ? selection.label
      : placeholder;

  return (
    <YStack alignItems="center">
      <XGroup width={240}>
        <XGroup.Item>
          <Input
            color="black"
            backgroundColor="white"
            disabled={disabled}
            flex={1}
            width={240}
            borderRadius={0}
            onFocus={() => setPopoverOpen(true)}
            onChangeText={searchTerm => setSearchTerm(searchTerm.toLowerCase())}
            placeholder={inputPlaceholder}
          />
        </XGroup.Item>
        <XGroup.Item>
          <Button disabled={disabled} onPress={() => setPopoverOpen(!popoverOpen)}>
            ▼
          </Button>
        </XGroup.Item>
      </XGroup>
      {popoverOpen && (
        <YGroup position="absolute" top="100%" zIndex={999}>
          <YStack>
            <YGroup
              alignSelf="center"
              bordered
              width={240}
              size="$5"
              height={200}
              backgroundColor={mondayColors.mondayDark}
            >
              <ScrollView>
                {filteredOptions.map(item => (
                  <YGroup.Item key={item.value}>
                    <ListItem
                      style={{ borderRadius: 0 }}
                      hoverTheme
                      title={item.label}
                      subTitle={item.value}
                      icon={<Ionicons name="folder-outline" size={24} />}
                      pressTheme
                      focusTheme
                      cursor="pointer"
                      onPress={() => handleSelect(item)}
                    />
                  </YGroup.Item>
                ))}
              </ScrollView>
            </YGroup>
          </YStack>
        </YGroup>
      )}
    </YStack>
  );
}
