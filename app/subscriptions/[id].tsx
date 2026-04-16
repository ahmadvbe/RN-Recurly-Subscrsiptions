import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from 'react';
import { Text, View } from 'react-native';

const SubscriptionDetails = () => { //56:25
    const { id } = useLocalSearchParams<{ id: string }>(); //figure out which id  56:50 
    // const posthog = usePostHog();

    useEffect(() => {
        // Only capture if id is valid
        // if (id && typeof id === 'string' && id.trim()) {
        //     posthog.capture('subscription_details_viewed', { subscription_id: id });
        // }
    }, [id, 
        // posthog
    ]);

    return (
        <View>
            <Text>Subscription Details: {id}</Text>
            <Link href="/">Go back</Link>
        </View>
    )
}

export default SubscriptionDetails
