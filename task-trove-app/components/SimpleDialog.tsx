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
  classNames?: string;
  withHeader?: boolean;
  withClose?: boolean;
};

export function SimpleDialog({
  trigger,
  title,
  content,
  withHeader,
  withClose,
  classNames,
}: SimpleDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <TouchableOpacity>{trigger}</TouchableOpacity>
      </DialogTrigger>
      <DialogContent className={classNames}>
        {withHeader && (
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
        )}

        {content}
        <DialogFooter>
          {withClose && (
            <DialogClose asChild>
              <Button className="bg-primary">
                <Text>OK</Text>
              </Button>
            </DialogClose>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
