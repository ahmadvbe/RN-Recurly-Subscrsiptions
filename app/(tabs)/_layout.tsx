import { tabs } from "@/constants/data";
import { colors, components } from '@/constants/theme';
import { useAuth } from '@clerk/expo';
import clsx from "clsx";
import { Redirect, Tabs } from "expo-router";
import { Image, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

//   layout to be created specifically to the tabs group 1:03:50
//     app/(tabs)/_layout.tsx

const tabBar = components.tabBar; //1:17:05 coming from theme.ts

const TabIcon = ({focused, icon}: TabIconProps) => { //1:11:50
    return (
        <View className="tabs-icon">
            <View className={clsx('tabs-pill', focused && 'tabs-active')}>
                <Image source={icon} resizeMode="contain" className="tabs-glyph"/>
            </View>
        </View>
    );
};
const TabLayout = () => { //1:04:00

    // 4-Protect the Home Routes by checking the user's authentication state and redirecting unauthenticated users
    //  to the sign-in page, ensuring that only authenticated users can access the main content of the app. 2:35:40
    //#### app/(tabs)/_layout.tsx : protect home routes with auth check
            //       NAVIGATION LOGIC USING useAuth Hook to check whether the user is signed in and whether evg is loaded 2:40:10
            //   this check lives in the layout not within the invidual screen, 
            //     =>that way every screen inside of the tabs group is automatically protected
        const { isSignedIn, isLoaded } = useAuth();


        const insets = useSafeAreaInsets(); //1:15:55

        // Wait for auth to load before rendering anything
        if (!isLoaded) {
            return null;
        }

        // Redirect to sign-in if user is not authenticated
        if (!isSignedIn) {
            return <Redirect href="/(auth)/sign-in" />;
        }

        return (
            <Tabs //1:04:05 coming from expo router 
                screenOptions={{ 
                        headerShown: false,
                        tabBarShowLabel: false, //1:14:55
                        tabBarStyle: {
                                position: 'absolute',
                                bottom: Math.max(insets.bottom, tabBar.horizontalInset), //1:17:28
                                height: tabBar.height,
                                marginHorizontal: tabBar.horizontalInset,
                                borderRadius: tabBar.radius,
                                backgroundColor: colors.primary,
                                borderTopWidth: 0,
                                elevation: 0,
                        },
                        tabBarItemStyle: { //1:18:50
                                paddingVertical: tabBar.height / 2 - tabBar.iconFrame / 1.6
                        },
                        tabBarIconStyle: { //1:19:05
                                width: tabBar.iconFrame,
                                height: tabBar.iconFrame,
                                alignItems: 'center'
                        }
            }}
            >
                    {tabs.map((tab) => ( //1:11:00
                        <Tabs.Screen //1:04:45 display our screen
                            key={tab.name}
                            name={tab.name}
                            options={{
                                    title: tab.title,
                                    tabBarIcon: ({focused}) => ( //1:13:38
                                        <TabIcon focused={focused} icon={tab.icon} />
                                    )
                            }}/>
                    ))}
            </Tabs>
        )
}

export default TabLayout;
