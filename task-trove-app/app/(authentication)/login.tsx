import {Link, Stack} from 'expo-router';
import {Button, styled} from 'tamagui';
import {Image} from 'tamagui';
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
        const url = "https://auth.monday.com/oauth2/authorize?client_id=55b279c1eb45e23ce60d4cc032d63ab6&redirect_uri=http://1e4e-151-248-53-93.ngrok-free.app/auth-token&scope=me:read&app_version_id=10233356"
        await Linking.openURL(url);
    }

    return (
        <>
            <Stack.Screen options={{title: 'login'}}/>
            <Container>
                <Logo/>

                <Link href="/">Home</Link>
                <Link href="/success">Login Success</Link>
                <Button onPress={openMonday}>Sign in with Monday.com</Button>
            </Container>
        </>
    );
}