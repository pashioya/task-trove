import React from 'react';
import { View, Text, Image } from 'react-native';
import { Separator } from '~/components/ui/separator';
import { Button } from '~/components/ui/button';
import { FeatherIcon } from 'lucide-react-native';
import type { Task } from '~/model/types';

export default function TaskCard({ item }: { item: Task }) {
  return (
    <View>
      <View>
        <Image
          alt=""
          resizeMode="cover"
          className="w-full h-[180px] rounded-t-2xl"
          source={require('~/assets/images/tryve/general.jpg')}
        />
      </View>

      <View className=" py-6 px-4">
        <View className=" flex-row items-center justify-between mb-7">
          <Text className=" font-semibold text-2xl">{item.name}</Text>
          <Text> distance to task</Text>
        </View>

        <View className=" pb-8 flex-row items-center justify-between ">
          <View className="flex-row items-center">
            <FeatherIcon color="#48496c" size={14} />
            <Text className=" font-semibold ml-1">location</Text>
          </View>
          <Separator orientation="vertical" />
          <View className="flex-row items-center">
            <FeatherIcon color="#48496c" size={14} />
            <Text className=" font-semibold ml-1">date added / modified</Text>
          </View>
        </View>
        <Separator />
        <View className=" pt-4 flex-row items-center justify-between">
          <Button variant="outline" disabled>
            <Text className="font-semibold">Get Directions</Text>
          </Button>
          <Button variant="outline" disabled>
            <Text className="font-semibold">View On Map</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
