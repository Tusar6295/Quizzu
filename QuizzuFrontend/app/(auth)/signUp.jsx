import { View, Text, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { images } from '../../constants'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import FormField from '../../components/FormField'
import CustomButton from '../../components/CustomButton'
import { Link } from 'expo-router'

const SignUp = () => {
  const [form, setForm] = useState({
    firstName: '',
    email: '',
    password: ''
  })

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView>
        <View className="w-full justify-center h-full px-6 my-7">
          <View className="flex-row w-full gap-2 items-center">
            <Image
              source={images.logo}
              className="w-[40px] h-[52px]"
            />
            <Text className="font-psemibold text-4xl">
              Quizzu
            </Text>
          </View>
          <Text className="text-2xl font-psemibold mt-7">
            Sign Up
          </Text>

          <FormField 
            title="First Name"
            value={form.firstName}
            onChangeText={(e) => setForm({...form,
              firstName: e
            })}
            placeholder="Enter your first name"
            otherStyles="mt-7"
            keyboardType="default"
          />

          <FormField 
            title="Email"
            value={form.email}
            onChangeText={(e) => setForm({...form,
              email: e
            })}
            placeholder="Enter your email"
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          
          <FormField 
            title="Password"
            value={form.password}
            onChangeText={(e) => setForm({...form,
              password: e
            })}
            placeholder="Enter your password"
            otherStyles="mt-7"
            secureTextEntry
          />

          <CustomButton 
             name="Create Account"
             containerStyles="mt-7"
             
          />

          <View className="justify-center flex-row mt-6">
              <Text className="text-base text-gray-600 font-pmedium">Already have an account? </Text>
              <Link href="/signIn" className="text-base font-psemibold text-primary">Login</Link>
          </View>
        </View>
        <StatusBar style='dark' />
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp