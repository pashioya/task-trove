import { MapPinIcon } from 'lucide-react-native';
import colors from 'tailwindcss/colors';
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

type TaskListCardProps = {
  title: string;
  description: string;
  content?: string;
  footer?: string;
};

export default function TaskListCard({ title, description }: TaskListCardProps) {
  return (
    <Card className="w-full max-w-sm my-2">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <MapPinIcon
          size={35}
          style={{
            position: 'absolute',
            right: 12,
            top: 21,
            width: 24,
            height: 24,
          }}
          color={colors.red[500]}
        />
      </CardHeader>
    </Card>
  );
}
