import React from 'react';
import { View, Text, Image } from 'react-native';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import { FeatherIcon } from 'lucide-react-native';
import type { Task } from '~/model/types';
import { Link } from 'expo-router';
import { DialogClose } from './ui/dialog';

export default function TaskCard({ task }: { task: Task }) {
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

      <View className=" py-6 px-4">
        <View className=" flex-row items-center justify-between mb-7">
          <Text className=" font-semibold text-2xl">{task.name}</Text>
          <Text> distance to task</Text>
        </View>

        <View className=" pb-8 flex-row items-center justify-between ">
          <View className="flex-row items-center">
            <FeatherIcon color="#48496c" size={14} />
            <Text className=" font-semibold ml-1">{task.address.split(',')[1]}</Text>
          </View>
          <Separator orientation="vertical" />
          <View className="flex-row items-center">
            <FeatherIcon color="#48496c" size={14} />
            <Text className=" font-semibold ml-1">{task.id}</Text>
          </View>
        </View>
        <Separator />
        <View className=" pt-4 flex-row items-center justify-between">
          <Button variant="outline" disabled>
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
