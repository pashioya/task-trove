import { LinearGradient } from '@tamagui/linear-gradient';
import { CarFront, Check, ChevronDown, ChevronUp } from '@tamagui/lucide-icons';
import { useState } from 'react';
import { Select, YStack, type SelectProps } from 'tamagui';

export default function BasicSelect(props: SelectProps) {
  const [val, setVal] = useState('apple');

  return (
    <Select value={val} onValueChange={setVal} disablePreventBodyScroll {...props}>
      <Select.Trigger
        width={220}
        iconAfter={<ChevronDown size={24} />}
        style={{
          backgroundColor: 'gray',
          borderWidth: 0,
          borderRadius: 8,
          width: 335,
          height: 56,
        }}
      >
        <Select.Value placeholder="Something" />
      </Select.Trigger>
      {/* //! Ignored because of an issue with the Adapt Component. Fix Later */}
      {/* @ts-expect-error TS2308 */}
      <Select.Adapt when="sm">
        <Select.Sheet
          modal
          animationConfig={{
            type: 'spring',
            damping: 20,
            mass: 1.2,
            stiffness: 250,
          }}
          dismissOnSnapToBottom
          native={!!props.native}
        >
          <Select.Sheet.Frame>
            <Select.Sheet.ScrollView>
              <Select.Adapt.Contents />
            </Select.Sheet.ScrollView>
          </Select.Sheet.Frame>
          <Select.Sheet.Overlay />
        </Select.Sheet>
      </Select.Adapt>
      <Select.Content zIndex={200000}>
        <Select.ScrollUpButton
          alignItems="center"
          justifyContent="center"
          position="relative"
          width="100%"
          height="$3"
        >
          <YStack zIndex={10}>
            <ChevronUp size={24} />
          </YStack>
          <LinearGradient
            start={[0, 0]}
            end={[0, 1]}
            fullscreen
            colors={['$background', '$backgroundTransparent']}
            borderRadius="$4"
          />
        </Select.ScrollUpButton>
        <Select.Viewport>
          <Select.Group>
            <Select.Item index={0} value="apple">
              <Select.ItemText>apple1</Select.ItemText>
              <Select.ItemIndicator>
                <Check size={24} />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item index={1} value="apple2">
              <Select.ItemText>apple2</Select.ItemText>
              <Select.ItemIndicator>
                <Check size={24} />
              </Select.ItemIndicator>
            </Select.Item>
            <Select.Item index={2} value="apple3">
              <Select.ItemText>apple3</Select.ItemText>
              <Select.ItemIndicator>
                <Check size={24} />
              </Select.ItemIndicator>
            </Select.Item>
          </Select.Group>
          {props.native && (
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
              <ChevronDown size={24} />
            </YStack>
          )}
          <Select.ScrollDownButton
            alignItems="center"
            justifyContent="center"
            position="relative"
            width="100%"
            height="$3"
          >
            <YStack zIndex={10}>
              <CarFront size={24} />
            </YStack>
            <LinearGradient
              start={[0, 0]}
              end={[0, 1]}
              fullscreen
              colors={['transparent', '$background']}
              borderRadius="$4"
            />
          </Select.ScrollDownButton>
        </Select.Viewport>
      </Select.Content>
    </Select>
  );
}
