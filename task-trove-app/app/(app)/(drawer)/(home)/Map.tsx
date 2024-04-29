import { Link, Stack } from 'expo-router';
import * as Linking from 'expo-linking';
import {Container} from '~/components/Container';
import React, {useEffect, useState} from "react";
import {View, Text} from "tamagui";
import { Pause, Play } from '@tamagui/lucide-icons'
import {TouchableOpacity} from "react-native";
import * as ExpoLocation from 'expo-location';
import * as TaskManager from 'expo-task-manager';

const LOCATION_TASK_NAME = 'background-location-task';

export default function Map() {
    const url = Linking.useURL();

    const [isTracking, setIsTracking] = useState(false);
    const [region, setRegion] = useState({lat: 0, long: 0, speed: 0});

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
            distanceInterval: 1,
            // foregroundService is how you get the task to be updated as often as would be if the app was open
            showsBackgroundLocationIndicator: true,
            foregroundService: {
                notificationTitle: 'Using your location',
                notificationBody: 'To turn off, go back to the app and switch something off.',
            },
        });

        const hasStarted = await ExpoLocation.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME);
        console.log('Tracking started', hasStarted);
    }

    const stopLocationUpdates = async () => {
        console.log('Tracking stopped')

        TaskManager.isTaskRegisteredAsync(LOCATION_TASK_NAME)
            .then(tracking => {
                if (tracking) {
                    ExpoLocation.stopLocationUpdatesAsync(LOCATION_TASK_NAME);
                }
            })
    };

    useEffect(() => {
        const requestPermissions = async () => {
            const { status: foregroundStatus } = await ExpoLocation.requestForegroundPermissionsAsync();
            console.log('foregroundStatus', foregroundStatus)
            if (foregroundStatus === "granted") {
                const { status: backgroundStatus } = await ExpoLocation.requestBackgroundPermissionsAsync();
                console.log('backgroundStatus', backgroundStatus)
                if (backgroundStatus === "granted") {
                    return;
                } else {
                    console.log('Background location permission not granted');
                }
            }
        };
        requestPermissions();
    }, []);

    TaskManager.defineTask(LOCATION_TASK_NAME, async ({data, error}) => {
        if (error) {
            console.log('LOCATION_TRACKING task ERROR:', error);
            return;
        }
        if (data) {
            const locations = data.locations;
            const lat = locations[0].coords.latitude;
            const long = locations[0].coords.longitude;
            const speed = locations[0].coords.speed;

            setRegion({lat, long, speed});

            console.log(
                `${new Date(Date.now()).toLocaleString()}: ${lat},${long} - Speed ${speed}`
            );
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
                            <Pause/>
                        ) : (
                            <Play/>
                        )}
                    </TouchableOpacity>
                    <Text>URL: {url}</Text>
                    <Text>
                        {isTracking ? `${region.lat.toFixed(3)}, ${region.long.toFixed(3)}, Speed: ${region.speed.toFixed(3)}` : 'You are not currently sharing your location'}
                    </Text>
                </View>
            </Container>
        </>
    )
}