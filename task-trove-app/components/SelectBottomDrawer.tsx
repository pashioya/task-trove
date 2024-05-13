import { Select, Sheet, YStack } from 'tamagui';
import React, { useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { LinearGradient } from 'tamagui/linear-gradient';

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
    <Select
      value={selectedValue}
      onValueChange={value => onValueChange && onValueChange(value)}
      disablePreventBodyScroll
    >
      <Select.Trigger width={220} iconAfter={ChevronDown} backgroundColor="white" color="black">
        <Select.Value placeholder={placeholder} color="black" />
      </Select.Trigger>

      {/* //! Ignored because of an issue with the Adapt Component. Fix Later */}
      {/* @ts-expect-error TS2308 */}
      <Select.Adapt when="sm">
        <Select.Sheet
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Select.Sheet.Frame>
            <Sheet.ScrollView>
              <Select.Adapt.Contents />
            </Sheet.ScrollView>
          </Select.Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Select.Sheet>
      </Select.Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton position="relative" width="100%" height="$3">
          <YStack zIndex={10}>
            <ChevronUp size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', 'transparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>

        <Select.Viewport>
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.value}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator>
                        <Check size={24} />
                      </Select.ItemIndicator>
                    </Select.Item>
                  );
                }),
              [items],
            )}
          </Select.Group>
        </Select.Viewport>

        <Select.ScrollDownButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronDown size={20} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['transparent', '$background']}
            borderRadius="$4"
          />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select>
  );
};
