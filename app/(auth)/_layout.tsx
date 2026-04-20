import '@/global.css';
import { useAuth } from '@clerk/expo';
import { Redirect, Stack } from "expo-router";

//      #### 2-app/(auth)/_layout.tsx : create auth layout with redirect logic 
export default function AuthLayout() {
    const { isSignedIn, isLoaded } = useAuth();

    // Wait for auth to load before rendering anything
    if (!isLoaded) {
        return null;
    }

    // // Redirect to home if user is already signed in
    if (isSignedIn) {
        return <Redirect href="/(tabs)" />;
    }

    return <Stack //52:25
        screenOptions={{ headerShown: false }} //hide the header for all auth screens
        />;
}
