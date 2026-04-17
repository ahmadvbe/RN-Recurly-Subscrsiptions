import '@/global.css';
// import { useAuth } from '@clerk/expo';
import { Stack } from "expo-router";

export default function AuthLayout() {
    // const { isSignedIn, isLoaded } = useAuth();

    // Wait for auth to load before rendering anything
    // if (!isLoaded) {
    //     return null;
    // }

    // // Redirect to home if user is already signed in
    // if (isSignedIn) {
    //     return <Redirect href="/(tabs)" />;
    // }

    return <Stack //52:25
        screenOptions={{ headerShown: false }} //hide the header for all auth screens
        />;
}
