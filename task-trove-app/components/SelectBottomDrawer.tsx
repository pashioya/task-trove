import { Adapt, Select, Sheet } from 'tamagui';
import React from 'react';

export type SelectItem = {
  name: string;
  value: string;
};

type SelectBottomDrawerProps = {
  items: SelectItem[];
  placeholder: string;
  selectedValue: string;
  onValueChange?: (value: string) => void;
};
export const SelectBottomDrawer: React.FC<SelectBottomDrawerProps> = ({
  items,
  placeholder,
  selectedValue,
  onValueChange,
}) => {
  return (
    <Select onValueChange={value => onValueChange && onValueChange(value)}>
      <Select.Trigger width={220} justifyContent="center">
        <Select.Value
          placeholder={selectedValue || placeholder}
          backgroundColor="white"
          color="black"
          textAlign="center"
        />
      </Select.Trigger>

      <Adapt platform="touch">
        <Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame backgroundColor="white">
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={20000}>
        <Select.Viewport minWidth={220}>
          <Select.Group backgroundColor="red">
            <Select.Label textAlign="center" color="black" backgroundColor="white">
              {placeholder}
            </Select.Label>
            {items.map((item, index) => (
              <Select.Item
                backgroundColor="white"
                color="black"
                key={item.value}
                value={item.value}
                index={index}
              >
                {item.name}
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
};
