import * as Linking from 'expo-linking';
import {Link, Stack} from 'expo-router';
import { Text } from 'tamagui';
import {Container} from '~/components/Container';
import React, {useEffect, useState} from "react";
import {styled, Image, View, Text} from "tamagui";
import {TouchableOpacity} from "react-native";
import * as ExpoLocation from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

export default function Home() {
    const url = Linking.useURL();

    const [isTracking, setIsTracking] = useState(false);
    const [region, setRegion] = useState({lat: 0, long: 0, speed: 0});
    const [error, setError] = useState<string | null>(null);

    const toggleShareLocation = async () => {
        if (isTracking) {
            await stopLocationUpdates();
        } else {
            await startLocationUpdates();
        }
        setIsTracking(previousState => !previousState);
    }

    const startLocationUpdates = async () => {
        await ExpoLocation.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
            accuracy: ExpoLocation.Accuracy.Balanced,
            timeInterval: 1000,
        });
        console.log('ExpoLocation updates started')
    };

    const stopLocationUpdates = async () => {
        await ExpoLocation.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log('ExpoLocation updates stopped')
    };

    useEffect(() => {
        const requestPermissions = async () => {
            const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
            if (foregroundStatus === "granted") {
                const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
                if (backgroundStatus === "granted") { await ExpoLocation.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
                    accuracy: ExpoLocation.Accuracy.Highest, distanceInterval: 1, timeInterval: 1500, });
                }
            }
        };
        requestPermissions();
    }, []);


    const ButtonImage = styled(Image, {
        width: 200,
        height: 200,
    });

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({data, error}) => {
        console.log('Background location task triggered');
        if (error) {
            console.error('Error in background location task', error);
            return;
        }

        if (data) {
            const locations = (data as { locations: ExpoLocation.LocationObject[] }).locations;
            const latestLocation = locations[0];

            console.log('Background location timestamp:', latestLocation.timestamp); // Log timestamp directly

            setRegion({
                lat: latestLocation.coords.latitude || 0,
                long: latestLocation.coords.longitude || 0,
                speed: latestLocation.coords.speed || 0,
            });
            console.log('Background location = ', region);
        }
    });

    return (
        <>
            <Stack.Screen options={{title: 'Home'}}/>
            <Container>
                <Link href="/Login">Login</Link>
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity onPress={toggleShareLocation}>
                        {isTracking ? (
                            <ButtonImage source={require("~/assets/pause.png")}/>
                        ) : (
                            <ButtonImage source={require("~/assets/play.png")}/>
                        )}
                    </TouchableOpacity>

                    <Text>
                        {isTracking ? `${region.lat}, ${region.long}, Speed: ${region.speed}` : 'You are not currently sharing your location'}
                    </Text>
                </View>
            </Container>
        </>
    )
}
