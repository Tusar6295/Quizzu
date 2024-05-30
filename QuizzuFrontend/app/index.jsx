import { View, Text, ScrollView, Image } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Link,Redirect,router, useRouter } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { AuthContext } from '../context/GlobalContext'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
const App = () => {
  const { loading, isLoggedIn } = useContext(AuthContext);
  if (!loading && isLoggedIn) return <Redirect href="/home" />;

  const router = useRouter();
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{height: '100%'}}>
        <View className="flex-1 justify-center items-center px-6">
          <View className="flex-row justify-center items-center gap-5">
          <Image 
            source={images.logo}
            className="w-[80] h-[105]"
          />
          <Text className="text-4xl font-psemibold text-white">Quizzu</Text>
          </View>
          <CustomButton 
            name="Continue with email"
            onPress={() =>  router.push("/signIn")}
            containerStyles="bg-purple-200 mt-7"
            textStyles="text-secondary-900 text-xl"
          />
        </View>
      <StatusBar backgroundColor='#7C72E5' style='light'/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default App