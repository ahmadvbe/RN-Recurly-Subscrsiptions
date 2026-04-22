import { Link, useLocalSearchParams } from "expo-router";
import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { posthog } from '@/src/config/posthog';

const SubscriptionDetails = () => { //56:25
    const { id } = useLocalSearchParams<{ id: string }>(); //figure out which id  56:50

    useEffect(() => {
        if (id && typeof id === 'string' && id.trim()) {
            posthog.capture('subscription_details_viewed', { subscription_id: id });
        }
    }, [id]);

    return (
        <View>
            <Text>Subscription Details: {id}</Text>
            <Link href="/">Go back</Link>
        </View>
    )
}

export default SubscriptionDetails
