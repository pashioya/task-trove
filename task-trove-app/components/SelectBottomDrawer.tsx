import { Select, type SelectProps, Sheet, YStack } from 'tamagui';
import React, { useId, useMemo } from 'react';
import { Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { LinearGradient } from 'tamagui/linear-gradient';
import { mondayColors } from '~/tamagui.config';
export type SelectItem = {
  name: string;
  value: string;
};

type SelectBottomDrawerProps = SelectProps & {
  items: SelectItem[];
  disabled?: boolean;
  placeholder: string;
  selectedValue: string;
  onValueChange?: (value: string) => void;
};

export const SelectBottomDrawer: React.FC<SelectBottomDrawerProps> = ({
  items,
  disabled = false,
  placeholder,
  selectedValue,
  onValueChange,
  ...rest
}) => {
  const handleValueChange = (value: string) => {
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const id = useId();

  return (
    <Select
      id={id}
      defaultValue={placeholder}
      value={selectedValue || placeholder}
      onValueChange={handleValueChange}
      disablePreventBodyScroll
      {...rest}
    >
      <Select.Trigger
        disabled={disabled}
        width={220}
        iconAfter={ChevronDown}
        backgroundColor="white"
        color="black"
      >
        <Select.Value placeholder={placeholder || 'Select'} color="black" />
      </Select.Trigger>

      {/* Ignored because of an issue with the Adapt Component. Fix Later */}
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

        <Select.Viewport unstyled>
          <Select.Group>
            <Select.Item
              disabled
              backgroundColor={mondayColors.mondayDark}
              index={-1}
              value={placeholder}
            >
              <Select.ItemText>{placeholder}</Select.ItemText>
              <Select.ItemIndicator>
                <Check size={24} />
              </Select.ItemIndicator>
            </Select.Item>
            {useMemo(
              () =>
                items.map((item, index) => (
                  <Select.Item index={index} key={index} value={item.value}>
                    <Select.ItemText>{item.name}</Select.ItemText>
                    <Select.ItemIndicator>
                      <Check size={24} />
                    </Select.ItemIndicator>
                  </Select.Item>
                )),
              [items],
            )}
          </Select.Group>
          {/* Native gets an extra icon */}
          {rest.native && (
            <YStack
              position="absolute"
              right={0}
              top={0}
              bottom={0}
              alignItems="center"
              justifyContent="center"
              width="$4"
              pointerEvents="none"
            >
              <ChevronDown />
            </YStack>
          )}
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
