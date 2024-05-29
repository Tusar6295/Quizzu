import { View, Text, ScrollView, Image, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { icons, images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import useData from '../../config/useData'
import { getCategories } from '../../config/api'

const Home = () => {
  const {data: categories} = useData(getCategories);
  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="px-8 my-6 space-y-6">
        <View className="flex-row mb-6 justify-between">
          <View>
            <Text className="text-sm font-pmedium text-white">Welcome Back</Text>
            <Text className="text-2xl font-psemibold text-white">Sai Dheeraj</Text>
          </View>
          <Image
            source={images.logo}
            className="w-[50] h-[64]"
          />
        </View>
        <SearchInput
          placeholder="Search for a category"
          otherStyles="bg-secondary-100"
        />
      </View>

      <FlatList
        className="w-full"
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={style.row}
        renderItem={({ item }) => (
          <TouchableOpacity>
            <View className="w-[150] h-[150] m-4 bg-secondary-100 rounded-xl justify-center items-center">
              <Text className="text-xl font-psemibold text-secondary-900 text-center">{item.title}</Text>
            </View>
          </TouchableOpacity>

        )}
      />
    </SafeAreaView>

  )
}

const style = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "center",
  }
});

export default Home