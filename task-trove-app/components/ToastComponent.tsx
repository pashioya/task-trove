import React from 'react';
import { YStack } from 'tamagui';
import { Toast } from '@tamagui/toast';

export const ToastComponent = () => {
  return (
    <Toast
      key={1}
      duration={5000}
      enterStyle={{ opacity: 0, scale: 0.5, y: -25 }}
      exitStyle={{ opacity: 0, scale: 1, y: -20 }}
      y={0}
      opacity={1}
      scale={1}
      animation="bouncy"
      viewportName="default"
    >
      <YStack>
        {/* <Toast.Title>{title}</Toast.Title> */}
        <Toast.Title>Test</Toast.Title>
        {/* <Toast.Description>{message}</Toast.Description> */}
        <Toast.Description>Testinggg</Toast.Description>
      </YStack>
    </Toast>
  );
};
