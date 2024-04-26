import * as Linking from 'expo-linking';
import { View, Text } from 'react-native';

export default function BufferPage() {
    const url = Linking.useURL()
    console.log(url)

    return (
        <View>
            <Text>${url}</Text>
            {/* Display buffer content based on bufferId (optional) */}
        </View>
    );
}
