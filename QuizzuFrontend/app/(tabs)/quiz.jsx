import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'

const Quiz = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
    <ScrollView>

    </ScrollView>
    <StatusBar backgroundColor='#7C72E5' style='light'/>
  </SafeAreaView>
  )
}

export default Quiz