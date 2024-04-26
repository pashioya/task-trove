import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native'; // Import navigation hook
import { View, Text } from 'react-native';
import {useEffect} from "react"; // Or your preferred UI library

export default function BufferPage() {
    const url = Linking.useURL()
    console.log(url)

    return (
        <View>
            <Text>Buffer Page Content</Text>
            {/* Display buffer content based on bufferId (optional) */}
        </View>
    );
}
