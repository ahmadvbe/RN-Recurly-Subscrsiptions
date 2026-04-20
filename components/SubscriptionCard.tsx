import { formatCurrency, formatStatusLabel, formatSubscriptionDateTime } from "@/lib/utils";
import clsx from "clsx";
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

//  ### 1:58:25  components/SubscriptionCard.tsx
 //1:59:00 components/SubscriptionCard.tsx
const SubscriptionCard = ({ name, price, currency, icon, billing, color, 
    category, plan, renewalDate, expanded,
     onPress, paymentMethod, startDate, status}: SubscriptionCardProps) => {
    return (
        <Pressable  //2:04:30 to make it tappable/interactive instead of using <View>
        //pressable recommend over Touchable Opacity 2:04:50 
                 // gets you access to the  onPress Props
                 //while expanded will be got from the passed in props
        //  allowing users to interact with the card and view more details about their subscription when they tap on it.
                onPress={onPress} //2:05:20
                //clsx use to switch between different states 2:05:05 whether expanded or vcollapses
                className={clsx('sub-card', expanded ? 'sub-card-expanded' : 'bg-card')} 
                style={!expanded && color ?  //2:02:20
                        { backgroundColor: color } : undefined}>
                            
            <View  //2:00:00
                className="sub-head">
                <View className="sub-main">
                    <Image //react native 2:00:15
                        source={icon} 
                        className="sub-icon" />
                    <View 
                        className="sub-copy">
                        <Text //2:00:40
                            numberOfLines={1} 
                            className="sub-title">
                            {name}
                        </Text>
                        <Text //2:03:25
                        numberOfLines={1} //truncate it if it exceeds one line and add an ellipsis at the end to indicate that there is more text that is not being displayed.
                        ellipsizeMode="tail" 
                        className="sub-meta">
                            {category?.trim() || plan?.trim() || (renewalDate ? formatSubscriptionDateTime(renewalDate) : '')}
                        </Text>
                    </View>
                </View>

                <View //2:00:55
                    className="sub-price-box">
                    <Text className="sub-price">{formatCurrency(price, currency)}</Text>
                    <Text className="sub-billing">{billing}</Text>
                </View>
            </View>

            {expanded && ( //2:07:35 only true if expanded
                <View className="sub-bdy">
                    <View className="sub-details">
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Payment:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode="tail">{paymentMethod?.trim() ??  //2:09:30
                                                                                                    'Not provided'}</Text>
                            </View>
                        </View>
                        <View className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Category:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode="tail">{(category?.trim() || plan?.trim()) ?? 'Not provided'}</Text>
                            </View>
                        </View>
                        <View  //2:10:00 value coming from props
                            className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Started:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode="tail">{startDate ? formatSubscriptionDateTime(startDate) : 'Not provided'}</Text>
                            </View>
                        </View>
                        <View //2:10:45 coming from props
                            className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Renewal date:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode="tail">{renewalDate ? formatSubscriptionDateTime(renewalDate) : 'Not provided'}</Text>
                            </View>
                        </View>
                        <View  //2:11:00 coming from props
                            className="sub-row">
                            <View className="sub-row-copy">
                                <Text className="sub-label">Status:</Text>
                                <Text className="sub-value" numberOfLines={1} ellipsizeMode="tail">{status ? formatStatusLabel(status) : 'Not provided'}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </Pressable>
    )
}
export default SubscriptionCard
