import * as React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tooltip, TooltipContent, TooltipTrigger } from '~/components/ui/tooltip';

type SimpleTooltipProps = {
  trigger: React.ReactNode;
  content: React.ReactNode;
};

export function SimpleTooltip({ trigger, content }: SimpleTooltipProps) {
  const [open, setOpen] = React.useState(false);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  return (
    <View className="flex-1 justify-center items-center p-6">
      <Tooltip open={open} onOpenChange={setOpen} delayDuration={150}>
        <TooltipTrigger asChild>{trigger}</TooltipTrigger>
        <TooltipContent insets={contentInsets}>{content}</TooltipContent>
      </Tooltip>
    </View>
  );
}
