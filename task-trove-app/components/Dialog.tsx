import { X } from '@tamagui/lucide-icons';
import React, { type ReactNode } from 'react';

import { Adapt, Button, Dialog, Sheet, Unspaced, XStack } from 'tamagui';

type DialogProps = {
  title: string;
  description: string;
  content: ReactNode;
  trigger?: ReactNode;
  close?: ReactNode;
};

export const DialogInstance: React.FC<DialogProps> = ({
  title,
  description,
  content,
  trigger,
  close,
}) => {
  return (
    <Dialog modal>
      <Dialog.Trigger asChild>{trigger ? trigger : <Button>Show Dialog</Button>}</Dialog.Trigger>
      {/* Ignored because of an issue with the Adapt Component. Fix Later */}
      {/* @ts-expect-error TS2308 */}
      <Adapt when="lg" platform="touch">
        <Sheet animation="lazy" zIndex={200000} modal dismissOnSnapToBottom>
          <Sheet.Frame padding="$4" gap="$4">
            <Adapt.Contents />
          </Sheet.Frame>

          <Sheet.Overlay animation="lazy" enterStyle={{ opacity: 0 }} exitStyle={{ opacity: 0 }} />
        </Sheet>
      </Adapt>
      <Dialog.Portal>
        <Dialog.Overlay
          key="overlay"
          animation="slow"
          opacity={0.5}
          enterStyle={{ opacity: 0 }}
          exitStyle={{ opacity: 0 }}
        />
        <Dialog.Content
          bordered
          elevate
          key="content"
          animateOnly={['transform', 'opacity']}
          animation={[
            'quicker',
            {
              opacity: {
                overshootClamping: true,
              },
            },
          ]}
          enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
          exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
          gap="$4"
        >
          <Dialog.Title>{title}</Dialog.Title>
          <Dialog.Description>{description}</Dialog.Description>
          {content}
          <XStack alignSelf="flex-end" gap="$4">
            <Dialog.Close displayWhenAdapted asChild>
              {close ? (
                close
              ) : (
                <Button theme="active" aria-label="Close">
                  Close
                </Button>
              )}
            </Dialog.Close>
          </XStack>
          <Unspaced>
            <Dialog.Close asChild>
              <Button position="absolute" top="$3" right="$3" size="$2" circular icon={X} />
            </Dialog.Close>
          </Unspaced>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
};
