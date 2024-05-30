import { View, Text } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context';

const quizList = () => {
    const { categoryId } = useLocalSearchParams();
    return (
        <SafeAreaView className="bg-primary h-full">
            <View>
                <Text>{categoryId}</Text>
            </View>
        </SafeAreaView>

    )
}

export default quizList;