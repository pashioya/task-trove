import { LinearGradient } from '@tamagui/linear-gradient';
import { ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Adapt, Select, Sheet, YStack, type SelectProps } from 'tamagui';

export default function BasicSelect(props: SelectProps) {
  const [val, setVal] = useState('apple');

  return (
    <Select value={val} onValueChange={val => setVal(val)} disablePreventBodyScroll {...props}>
      <Select.Trigger width={220} iconAfter={ChevronDown}>
        <Select.Value placeholder="Something" />
      </Select.Trigger>

      <Adapt>
        <Sheet native={!!props.native}>
          <Sheet.Frame>
            <Adapt.Contents />
          </Sheet.Frame>
        </Sheet>
      </Adapt>

      <Select.Group>
        <Select.Label> Choose a number</Select.Label>
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
          <Select.Viewport>
            <Select.Item index={1} value="1">
              One
            </Select.Item>
            <Select.Item index={2} value="2">
              Two
            </Select.Item>
            <Select.Item index={3} value="3">
              Three
            </Select.Item>
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Group>
    </Select>
  );
}
