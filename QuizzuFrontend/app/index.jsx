import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { Link,router } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
const App = () => {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="flex-1 justify-center items-center ">
          <Text className="text-white">App</Text>
          <Link href="signUp" className='text-white text-3xl'>Go to sign up</Link>
        </View>
      <StatusBar backgroundColor='#161622' style='light'/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App