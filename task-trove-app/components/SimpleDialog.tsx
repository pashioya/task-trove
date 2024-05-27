import * as React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Button } from '~/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '~/components/ui/dialog';
import { Text } from '~/components/ui/text';

type ExampleProps = {
  trigger: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

export function SimpleDialog({ trigger, title, content }: ExampleProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity>{trigger}</TouchableOpacity>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter>
          <DialogClose asChild>
            <Button>
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
