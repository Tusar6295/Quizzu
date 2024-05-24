import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const App = () => {
  return (
    <View className="flex-1 justify-center items-center bg-white">
      <Text>App</Text>
      <Link href="/home" style={{color: "blue"}}>Go to Home</Link>
    </View>
  )
}

export default App