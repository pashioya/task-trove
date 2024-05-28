import type { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';

import { Text } from '~/components/ui/text';

type AlertDialogScreenProps = {
  trigger: ReactNode;
  actionIfConfirmed: () => void;
  title: string;
  description: string;
};

const SimpleAlertDialog: React.FC<AlertDialogScreenProps> = ({
  trigger,
  title,
  description,
  actionIfConfirmed,
}) => {
  return (
    <AlertDialog className="w-full">
      <AlertDialogTrigger className="w-full" asChild>
        {trigger}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            <Text>Cancel</Text>
          </AlertDialogCancel>
          <AlertDialogAction className="bg-blue-500" onPress={actionIfConfirmed}>
            <Text>Continue</Text>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default SimpleAlertDialog;
