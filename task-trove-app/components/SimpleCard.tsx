import { MapPinIcon } from 'lucide-react-native';
import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';

type SimpleCardProps = {
  title: string;
  description: string;
  content?: string;
  footer?: string;
};

export default function SimpleCard({ title, description }: SimpleCardProps) {
  return (
    <Card className="w-full max-w-sm mt-4 mb-4">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <MapPinIcon
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: 24,
            height: 24,
          }}
          color="red"
        />
      </CardHeader>
    </Card>
  );
}
