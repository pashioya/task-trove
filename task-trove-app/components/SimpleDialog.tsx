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

type SimpleDialogProps = {
  trigger: React.ReactNode;
  title: string;
  content: React.ReactNode;
};

export function SimpleDialog({ trigger, title, content }: SimpleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity>{trigger}</TouchableOpacity>
      </DialogTrigger>
      <DialogContent className=" z-40">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {content}
        <DialogFooter>
          <DialogClose asChild>
            <Button className="bg-blue-700">
              <Text>OK</Text>
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
