import { Text, TouchableOpacity, View } from 'react-native'

// ### 1:48:45
const ListHeading = ({ title }: ListHeadingProps) => {//1:50:15 type.d.ts
    return (
        <View className="list-head">
            <Text className="list-title">{title}</Text>

            <TouchableOpacity className="list-action">
                <Text className="list-action-text">View all</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ListHeading
