import { Card, CardDescription, CardHeader, CardTitle } from '~/components/ui/card';
import type { Task } from '~/model/types';

export default function TaskListCard({ task }: { task: Task }) {
  return (
    <Card className="w-[90%] my-2 ml-5">
      <CardHeader>
        <CardTitle>{task.name}</CardTitle>
        <CardDescription>{task.address.split(',')[0]}</CardDescription>
      </CardHeader>
    </Card>
  );
}
