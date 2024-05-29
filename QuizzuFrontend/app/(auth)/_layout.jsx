import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="signIn" options={{ headerShown: false, animation: 'slide_from_right' }} />
        <Stack.Screen name="signUp" options={{ headerShown: false, animation: 'slide_from_right'}} />
      </Stack>
      <StatusBar style='dark'/>
    </>
  )
}

export default AuthLayout