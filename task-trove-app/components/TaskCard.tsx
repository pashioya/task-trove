import React from 'react';
import { View, Image, Linking } from 'react-native';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import { Clock, FeatherIcon } from 'lucide-react-native';
import type { Task } from '~/model/types';
import { Link } from 'expo-router';
import { DialogClose } from './ui/dialog';
import { useSession } from '~/contexts/session-provider';
import { useSettingsStore } from '~/store';
import { Text } from '~/components/ui/text';

export default function TaskCard({ task }: { task: Task }) {
  const dateChanged = new Date(task.changedAt);
  const simplifiedDate = `${dateChanged.getDate()}-${dateChanged.getMonth() + 1}-${dateChanged.getFullYear()}`;
  const simplifiedAddress = task.address.split(',')[1];
  const { session } = useSession();
  const { taskBoard } = useSettingsStore();

  return (
    <View>
      <View>
        <Image
          alt=""
          resizeMode="cover"
          className="w-full h-[200px] rounded-t-2xl"
          source={require('~/assets/images/tryve/general.jpg')}
        />
      </View>

      <View className="py-6 px-4">
        <View className="flex-row items-center justify-between mb-7">
          <Text className="font-semibold text-2xl">{task.name}</Text>
          <Text>{task.distanceTo ? task.distanceTo : 'Unknown'} km</Text>
        </View>

        <View className="pb-8 flex-row items-center justify-between ">
          <View className="flex-row items-center">
            <FeatherIcon color="#48496c" size={14} />
            <Text className="font-semibold ml-1">
              {simplifiedAddress ? simplifiedAddress : 'Unspecified'}
            </Text>
          </View>
          <Separator orientation="vertical" />
          <View className="flex-row items-center">
            <Clock color="#48496c" size={14} />
            <Text className="font-semibold ml-1">{simplifiedDate}</Text>
          </View>
        </View>
        <Separator />
        <View className="pt-4 flex-row items-center justify-between">
          <Button
            variant="outline"
            onPress={() =>
              Linking.openURL(
                `https://${session?.user?.slug}.monday.com/boards/${taskBoard?.id}/pulses/${task.id}`,
              )
            }
          >
            <Text className="font-semibold">View On Monday</Text>
          </Button>
          <Link
            href={{
              pathname: '/',
              params: { taskId: task.id },
            }}
            asChild
          >
            <DialogClose asChild>
              <Button variant="outline">
                <Text className="font-semibold">View On Map</Text>
              </Button>
            </DialogClose>
          </Link>
        </View>
      </View>
    </View>
  );
}
