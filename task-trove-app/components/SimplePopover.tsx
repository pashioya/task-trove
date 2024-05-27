import * as React from 'react';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Popover, PopoverContent, PopoverTrigger } from '~/components/ui/popover';

type PopoverProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
};

export default function SimplePopOver({ trigger, content }: PopoverProps) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <View className="flex-1 justify-center items-center p-6">
      <Popover>
        <PopoverTrigger asChild>
          <Pressable>{trigger}</Pressable>
        </PopoverTrigger>
        <PopoverContent insets={contentInsets} className="w-70">
          {content}
        </PopoverContent>
      </Popover>
    </View>
  );
}
