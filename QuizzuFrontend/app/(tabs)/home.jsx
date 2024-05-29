import { View, Text, ScrollView, Image, FlatList, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import { icons, images } from '../../constants'
import SearchInput from '../../components/SearchInput'

const Home = () => {
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
        data={[
          { id: 1, title: "Maths" },
          { id: 2, title: "Science" },
          { id: 3, title: "GK" },
          { id: 4, title: "History" },
          { id: 5, title: "Geography" },
          { id: 6, title: "Literature" },
          { id: 7, title: "Technology" },
          { id: 8, title: "Art" },
          { id: 9, title: "Sports" },
          { id: 10, title: "Music" },
          { id: 11, title: "Politics" },
          { id: 12, title: "Business" },
          { id: 13, title: "Health" }
        ]}
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