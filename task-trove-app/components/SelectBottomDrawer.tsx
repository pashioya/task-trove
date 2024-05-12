import { Adapt, Select, Sheet, YStack } from 'tamagui';
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
  onValueChange,
}) => {
  return (
    <Select
      value={placeholder}
      onValueChange={value => onValueChange && onValueChange(value)}
      disablePreventBodyScroll
    >
      <Select.Trigger width={220} backgroundColor="white">
        <Select.Value
          color="black"
          textAlign="center"
          alignItems="center"
          justifyContent="center"
          placeholder={placeholder}
        />
      </Select.Trigger>

      <Adapt platform="native">
        <Sheet
          native={false}
          modal
          dismissOnSnapToBottom
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
        >
          <Sheet.Frame>
            <Sheet.ScrollView>
              <Adapt.Contents />
            </Sheet.ScrollView>
          </Sheet.Frame>
          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>

      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
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

        <Select.Viewport
          // to do animations:
          // animation="quick"
          // animateOnly={['transform', 'opacity']}
          // enterStyle={{ o: 0, y: -10 }}
          // exitStyle={{ o: 0, y: 10 }}
          minWidth={200}
        >
          <Select.Group>
            <Select.Label>Fruits</Select.Label>
            {/* for longer lists memoizing these is useful */}
            {useMemo(
              () =>
                items.map((item, i) => {
                  return (
                    <Select.Item index={i} key={item.name} value={item.name.toLowerCase()}>
                      <Select.ItemText>{item.name}</Select.ItemText>
                      <Select.ItemIndicator marginLeft="auto">
                        {item.value === 'selected' && <Check size={20} />}
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
