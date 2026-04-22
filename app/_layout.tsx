import '@/global.css';

//2:39:10   #### 1-app/_layout.tsx : update root layout with clerk provider
// and pass in the publishable key from the environment variables, allowing us to use Clerk's authentication features throughout our app. 2:34:50
import { ClerkProvider, useAuth } from '@clerk/expo';
import { tokenCache } from '@clerk/expo/token-cache';

import { useFonts } from "expo-font";
import { SplashScreen, Stack, useGlobalSearchParams, usePathname } from "expo-router";
import { PostHogProvider } from 'posthog-react-native';
import { useEffect, useRef } from "react";
import { posthog } from '../src/config/posthog';

// 2:19:36 CODERABBIT fix : Missing SplashScreen.AutoHideAsync() 
SplashScreen.preventAutoHideAsync();

//2:39:10   #### 1-app/_layout.tsx : update root layout with clerk provider
const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;
if (!publishableKey) {
  throw new Error('Add your Clerk Publishable Key to the .env file');
}

function RootLayoutContent() {
  const { isLoaded: authLoaded } = useAuth();
  const pathname = usePathname();
  const params = useGlobalSearchParams();
  const previousPathname = useRef<string | undefined>(undefined);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      // Filter route params to avoid leaking sensitive data
      const sanitizedParams = Object.keys(params).reduce((acc, key) => {
        // Only include specific safe params
        if (['id', 'tab', 'view'].includes(key)) {
          acc[key] = params[key];
        }
        return acc;
      }, {} as Record<string, string | string[]>);

      posthog.screen(pathname, {
        previous_screen: previousPathname.current ?? null,
        ...sanitizedParams,
      });
      previousPathname.current = pathname;
    }
  }, [pathname, params]);


    // app.json =>add the expo font pluggin to the plugins array 1:29:30
    //   1:30:50 app/_layout.tsx =>load the fonts before any screen renders as we need to keep the splash screen visible until the fonts are loaded to avoid any flash of unstyled text
        //array desctructuring to load multiple font variants at once
        //RECAP @1:32:45
  const [fontsLoaded] = useFonts({ //where keys are the name of the fonts to use and the values are the require statements pointing to the font files
    //return of a boolean variable teleling u whether the fonts are finished loading or nt
    'sans-regular': require('../assets/fonts/PlusJakartaSans-Regular.ttf'),
    'sans-bold': require('../assets/fonts/PlusJakartaSans-Bold.ttf'),
    'sans-medium': require('../assets/fonts/PlusJakartaSans-Medium.ttf'),
    'sans-semibold': require('../assets/fonts/PlusJakartaSans-SemiBold.ttf'),
    'sans-extrabold': require('../assets/fonts/PlusJakartaSans-ExtraBold.ttf'),
    'sans-light': require('../assets/fonts/PlusJakartaSans-Light.ttf')
  })
    //1:32:00 related to the fontsLoaded state variable =>we use the useEffect hook to monitor the loading state of the fonts and the authentication status. We only hide the splash screen when both the fonts are loaded and the authentication status is determined (authLoaded is true). This ensures that users won't see any unstyled text or experience a flash of content before everything is ready.
    //the useEffect watches for the loading Process by watching the boolean returned by the useFonts hook 
    // and the authLoaded state from useAuth. Once both are true, it calls SplashScreen.hideAsync() to hide the splash screen and show the app content. If either fonts are still loading or auth status is not yet determined, it keeps the splash screen visible by returning null, preventing any part of the app from rendering until everything is ready. This provides a smooth user experience without flashes of unstyled content or premature rendering.
    useEffect(() => {
   
      // 2:49:20 CodeRabbit fix: Move the Clerk Provider outisde the font gate tom enable parallel loading of fonts and auth
      //PROMPT WITH JUNIE THE AI AGENT - auth and fonts loads in parallel 
    if (fontsLoaded && authLoaded) { // ===> Hide splash only when both fonts and auth are loaded
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded, authLoaded])//==>retrigger this in these cases

  // Don't render app until both are ready
  if (!fontsLoaded || !authLoaded) return null; //1:32:30 if fonts dont load at all =>we cannot show our app without them being loaded

  return <Stack screenOptions={{ headerShown: false }} />;
}

export default function RootLayout() {
  return (
    //2:55:25 POSTHOG automatic installation using the wizard
    <PostHogProvider
      client={posthog}
      autocapture={{
        captureScreens: false,
        captureTouches: true,
        propsToCapture: ['testID'],
      }}
    >
      <ClerkProvider //2:39:10   #### 1-app/_layout.tsx : update root layout with clerk provider 
                                      //wrapping our entire app
            publishableKey={publishableKey} 
            tokenCache={tokenCache}  //==>which uses the expo secure store which encrypts the session token on the device
                                     //when a user closes and reopens the app they stays logged in without re authenticating
            >
        <RootLayoutContent />
      </ClerkProvider>
    // </PostHogProvider>
  );
}
