import {Link, Stack} from 'expo-router';
import {Button, styled} from 'tamagui';
import {Image, Text} from 'tamagui';
import {Container} from '~/components/Container';
import * as Linking from 'expo-linking';


export default function Login() {
    const Logo = styled(Image, {
        name: 'Logo',
        source: require('~/assets/tryve-logo.png'),
        width: "100%",
        height: 130,
    });

    const openMonday = async () => {
        const url = "https://auth.monday.com/oauth2/authorize?client_id=55b279c1eb45e23ce60d4cc032d63ab6&redirect_uri=http://localhost:8080/auth-token&scope=me:read&app_version_id=10233356"
        await Linking.openURL(url);
    }

    return (
        <>
            <Stack.Screen options={{title: 'login'}}/>
            <Container>
                <Logo/>

                <Link href="/" asChild>
                    <Button>Home</Button>
                </Link>
                <Link href="/One" asChild>
                    <Button>Onboarding 1</Button>
                </Link>

                <Text>Sign In To Your Account</Text>

                <Button onPress={openMonday}>Sign In With Monday</Button>

                <Image
                    source={{
                        uri: '/task-trove-app/assets/monday-avatar-2.svg',
                        width: 500,
                        height: 500,
                    }}
                />
            </Container>
        </>
    );
}