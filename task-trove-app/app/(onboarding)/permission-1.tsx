import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import colors from 'tailwindcss/colors';
import { SimpleTooltip } from '~/components/SimpleTooltip';
import { Button } from '~/components/ui/button';
import { useLocationPermissions } from '~/hooks';

export default function LocationPermission() {
  const { requestPermissions, validatePermissions } = useLocationPermissions();
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    const checkPermissionsStatus = async () => {
      const permissionsGranted = await validatePermissions();
      setPermissionsGranted(permissionsGranted);
    };
    checkPermissionsStatus();
  }, [validatePermissions]);

  return (
    <>
      <View className="flex-1 ">
        <LinearGradient
          style={{
            flex: 1,
          }}
          colors={[colors.blue[50], colors.blue[100]]}
        >
          <ScrollView>
            <View className="flex-1 space-x-4 py-25 px-9">
              <View className="gap-2">
                <Text className="text-2xl font-medium text-purple-900 text-center mb-3 leading-10">
                  Allow Location Tracking?
                </Text>
                <Text className="text-m text-center text-slate-600">
                  We need your foreground location to keep track of your location on monday.
                </Text>
                <Text className="text-m text-center text-slate-600">
                  We Also need your background location to track your distace from your tasks.
                </Text>
                <View className="bg-transparent m-1 items-center h-96 justify-center shrink rounded-2xl p-2 ">
                  <MaterialIcons name="not-listed-location" size={100} />
                </View>
              </View>
            </View>
          </ScrollView>
          <View className="absolute bottom-10 w-full items-center gap-2">
            {permissionsGranted ? (
              <SimpleTooltip
                trigger={
                  <Pressable>
                    <Button className="w-96" disabled>
                      <Text className="text-white">Grant Permissions</Text>
                    </Button>
                  </Pressable>
                }
                content={<Text>Permissions Already Granted</Text>}
              />
            ) : (
              <Button
                className="w-96"
                onPress={async () => {
                  await requestPermissions();
                  setPermissionsGranted(await validatePermissions());
                }}
              >
                <Text className="text-white">Grant Permissions</Text>
              </Button>
            )}
            <Button
              className="md w-96"
              disabled={!permissionsGranted}
              onPress={() => {
                router.push('/permission-2');
              }}
            >
              <Text className="font-semibold text-white">Next</Text>
            </Button>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}
