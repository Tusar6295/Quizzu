import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Link, Redirect, router, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/GlobalContext'
import { icons, images } from '../constants'
import CustomButton from '../components/CustomButton'
import { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
const App = () => {
  const { loading, isLoggedIn } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (isLoggedIn) {
        router.replace("/home");
      } else {
        router.replace("/signIn");
      }
    }
  }, [loading, isLoggedIn]);

  return (
    <SafeAreaView className="bg-white h-full">
      {loading ? (
        <View className="flex-1 mt-7 items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View className="flex-1 justify-center items-center px-6">
          <View className="flex-row justify-center items-center gap-5">
            <Image
              source={images.logo}
              className="w-[80] h-[105]"
            />
            <Text className="text-4xl font-psemibold text-secondary-900">Quizzu</Text>
          </View>
        </View>
        <StatusBar backgroundColor='white' style='light' />
      </ScrollView>
      )}
    </SafeAreaView>
  )
}

export default App