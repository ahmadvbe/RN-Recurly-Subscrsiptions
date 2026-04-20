import CreateSubscriptionModal from "@/components/CreateSubscriptionModal";
import ListHeading from "@/components/ListHeading";
import SubscriptionCard from "@/components/SubscriptionCard";
import UpcomingSubscriptionCard from "@/components/UpcomingSubscriptionCard";
import { HOME_BALANCE, UPCOMING_SUBSCRIPTIONS } from "@/constants/data";
import { icons } from "@/constants/icons";
import images from "@/constants/images";
import "@/global.css";
import { useSubscriptionStore } from "@/lib/subscriptionStore";
import { formatCurrency } from "@/lib/utils";

import dayjs from "dayjs";
import { styled } from "nativewind";
import { useMemo, useState } from "react";
import { FlatList, Image, Pressable, Text, View } from "react-native";
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

//5-app/(tabs)/index.tsx : update home screen with user data
import { useUser } from '@clerk/expo';


const SafeAreaView = styled(RNSafeAreaView);



export default function App() {
  
    //  #### 5-app/(tabs)/index.tsx : update home screen with user data
    const { user } = useUser();


    // const posthog = usePostHog();

         //2:06:05 so that we put the pressable into action we will place it into out app/(tabs)/index.tsx and assign a state for it expandedSubscriptionId 2:06:05
    const [expandedSubscriptionId, setExpandedSubscriptionId] = useState<string | null>(null); 

    const [isModalVisible, setIsModalVisible] = useState(false);
    const { subscriptions, addSubscription } = useSubscriptionStore();

    // Get upcoming subscriptions (active subscriptions with renewal date within next 7 days)
    const upcomingSubscriptions = useMemo(() => {
        const now = dayjs();
        const nextWeek = now.add(7, 'days');
        return subscriptions.filter(sub =>
            sub.status === 'active' &&
            dayjs(sub.renewalDate).isAfter(now) &&
            dayjs(sub.renewalDate).isBefore(nextWeek)
        ).sort((a, b) => dayjs(a.renewalDate).diff(dayjs(b.renewalDate)));
    }, [subscriptions]);

    const handleSubscriptionPress = (item: Subscription) => { //2:06:55
        const isExpanding = expandedSubscriptionId !== item.id;
        setExpandedSubscriptionId((currentId) => (currentId === item.id ? null : item.id));
        // posthog.capture(isExpanding ? 'subscription_expanded' : 'subscription_collapsed', {
        //     subscription_name: item.name,
        //     subscription_id: item.id,
        // });
    };

    // const handleCreateSubscription = (newSubscription: Subscription) => {
    //     addSubscription(newSubscription);
    //     posthog.capture('subscription_created', {
    //         subscription_name: newSubscription.name,
    //         subscription_price: newSubscription.price,
    //         subscription_frequency: newSubscription.frequency,
    //         subscription_category: newSubscription.category,
    //     });
    // };

    // Get user display name: firstName, fullName, or email
    const displayName = user?.firstName || user?.fullName || user?.emailAddresses[0]?.emailAddress || 'User';

    return (
        <SafeAreaView  //1:20:30 so that the content doesnt cut off behin the nav bar --coming from "react-native-safe-area-context";
        //we need to get the styled wrapper of SafeAreaView =>allowing you to use talwind classes on it 
        className="flex-1 bg-background p-5">
                <FlatList
                    ListHeaderComponent={() => (
                        <>
                            <View //   ## Header 1:41:40  
                                 className="home-header">
                                <View className="home-user">
                                    <Image
                                        source={
                                                user?.imageUrl ? { uri: user.imageUrl } :  images.avatar
                                            }
                                        className="home-avatar"
                                    />
                                    <Text 
                                        className="home-user-name">
                                            {displayName}
                                            {/* {HOME_USER.name} */}
                                            </Text>
                                </View>

                                <Pressable 
                                        onPress={() =>  
                                                         setIsModalVisible(true)}>
                                    <Image  //1:45:00
                                        source={icons.add} 
                                        className="home-add-icon" />
                                </Pressable>
                            </View>

                            <View //1:45:25 Balance Card
                                className="home-balance-card">
                                <Text className="home-balance-label">Balance</Text>

                                <View className="home-balance-row">
                                    <Text //1:46:00 we use the formatCurrency utility function to format the balance amount as a currency string, ensuring it displays with the appropriate currency symbol and decimal places. This provides a clear and professional presentation of the user's balance on the home screen.
                                        className="home-balance-amount">
                                        {formatCurrency(HOME_BALANCE.amount)}
                                    </Text>
                                    <Text //1:46:35
                                        className="home-balance-date">
                                        {dayjs(HOME_BALANCE.nextRenewalDate).format('MM/DD')}
                                    </Text>
                                </View>
                            </View>

                            <View //1:48:00 ## Horizontal Scrolling list of upcoming subscriptions 2:16:00
                                className="mb-5">
                                <ListHeading  //1:49:40
                                title="Upcoming" />

                                <FlatList //1:55:00
                                    data={UPCOMING_SUBSCRIPTIONS}   //{upcomingSubscriptions}
                                    renderItem={({ item }) => ( //how the item should be rendered in the list
                                        <UpcomingSubscriptionCard 
                                            {...item} //spreading the item properties as props to the UpcomingSubscriptionCard component, allowing it to display the subscription details correctly.
                                        
                                        />
                                    )}
                                    keyExtractor={(item) => item.id}//specific property of the item to use as the unique key for each list item, which helps React optimize rendering and manage the list efficiently.
                                    horizontal //1:56:40 to enable horizontal scrolling for the list, allowing users to swipe left and right to view upcoming subscriptions.
                                    showsHorizontalScrollIndicator={false}
                                    ListEmptyComponent= //1:57:10 if there is ntg to show in the list, we render this component instead, 
                                    // providing feedback to the user that there are no upcoming renewals at the moment.
                                        {<Text className="home-empty-state">No upcoming renewals yet.</Text>}
                                />
                            </View>

                            <ListHeading //1:50:05 2:16:10
                            title="All Subscriptions" />
                        </>
                    )}
                    data={subscriptions}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => ( //2:12:10
                          // #### 2:11:40 Turn the Subsciption card into a LIST =>rendering it within the FlastList
                        <SubscriptionCard
                            {...item}  //each one of the subscrtiption cards is gonna get all the props
                            //spreading the subscription item properties as props to the SubscriptionCard component, allowing it to display all relevant subscription details correctly.
                            //{HOME_SUBSCRIPTIONS[0]} //1:54:00 pass in the data for the 1st home subscription 
                            // we replace the static HOME_SUBSCRIPTIONS data with the dynamic subscriptions data from the subscription store, ensuring that the list reflects the current state of the user's subscriptions.
                            expanded={expandedSubscriptionId === item.id} //2:06:35 2:12:35 pass th expanded state
                            onPress={() => handleSubscriptionPress(item)} //2:06:50 calling the set state update function to set
                            //  the expanded subscription ID when a subscription card is pressed,
                            //  allowing the card to expand and show more details when tapped.  2:12:40
                        />
                    )}
                    extraData={expandedSubscriptionId} //2:13:00 to ensure the list re-renders when the expanded subscription ID changes, allowing the UI to update and show the expanded details for the correct subscription card.
                    ItemSeparatorComponent={() => <View className="h-4" />}//create some spacing in between the cards
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Text className="home-empty-state">No subscriptions yet.</Text>}
                     
                    contentContainerClassName="pb-30" //2:16:42
                />

            <CreateSubscriptionModal
                visible={isModalVisible}
                onClose={() => setIsModalVisible(false)}
                onSubmit={ () =>{}
                    // handleCreateSubscription

                }
            />
        </SafeAreaView>
    );
}
