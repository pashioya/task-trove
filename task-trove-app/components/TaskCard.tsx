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
import { truncateText } from '~/lib/utils';
import colors from 'tailwindcss/colors';
import { useColorScheme } from '~/lib/useColorScheme';

export default function TaskCard({ task }: { task: Task }) {
  const dateChanged = new Date(task.changedAt);
  const simplifiedDate = `${dateChanged.getDate()}-${dateChanged.getMonth() + 1}-${dateChanged.getFullYear()}`;
  const simplifiedAddress = task.address.split(',')[1];
  const { session } = useSession();
  const { taskBoard } = useSettingsStore();
  const { isDarkColorScheme } = useColorScheme();

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
          <Text className="font-semibold text-xl">{truncateText(task.name, 15)}</Text>
          <Separator orientation="vertical" />
          <Text>{task.distanceTo ? task.distanceTo : 'Unknown'} km</Text>
        </View>

        <View className="pb-8 flex-row items-center justify-between ">
          <View className="flex-row items-center">
            <FeatherIcon color={colors.blue[500]} size={14} />
            <Text className="font-semibold ml-1">
              {simplifiedAddress ? simplifiedAddress : 'Unspecified'}
            </Text>
          </View>
          <Separator orientation="vertical" />
          <View className="flex-row items-center">
            <Clock color={colors.blue[500]} size={14} />
            <Text className="font-semibold ml-1">{simplifiedDate}</Text>
          </View>
        </View>
        <Separator />
        <View className="py-4">
          <Text className="text-sm">
            {truncateText(
              task.description ||
                `It looks like either this task doesn't have a description, or you haven't set up the description column in the settings yet`,
              300,
            )}
          </Text>
        </View>
        <Separator />
        <View className="pt-4 flex-row items-center justify-between">
          <Button
            variant="outline"
            className="h-11 rounded-md px-8 native:h-14"
            onPress={() =>
              Linking.openURL(
                `https://${session?.user?.slug}.monday.com/boards/${taskBoard?.id}/pulses/${task.id}`,
              )
            }
          >
            {!isDarkColorScheme ? (
              <Image
                source={require('~/assets/images/monday/monday-black.png')}
                className=" w-40 h-40"
                resizeMode="contain"
              />
            ) : (
              <Image
                source={require('~/assets/images/monday/monday-white.png')}
                className="  w-40 h-40"
                resizeMode="contain"
              />
            )}
          </Button>
          <Link
            href={{
              pathname: '/',
              params: { taskID: task.id },
            }}
            asChild
          >
            <DialogClose asChild>
              <Button variant="outline" className="w-40 " size="lg">
                <Text className="font-semibold">Map View</Text>
              </Button>
            </DialogClose>
          </Link>
        </View>
      </View>
    </View>
  );
}
