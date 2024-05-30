import { View, Text, ScrollView, Image, FlatList, StyleSheet, ImageBackground, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons, images } from '../../constants'
import SearchInput from '../../components/SearchInput'
import useData from '../../config/useData'
import { getCategories, searchByCategory } from '../../config/api'
import { Ionicons } from '@expo/vector-icons'
import { AuthContext } from '../../context/GlobalContext'
import { useState } from 'react'
import { router, usePathname } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
  const pathname = usePathname();
  const { signOut } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState(null);
  const { data: categories, isLoading, refetch } = useData(searchParams ? searchByCategory : getCategories, searchParams);
  const [userData, setUserData] = useState({ firstName: "" });

  useEffect(() => {
    const fetchUserData = async () => {
      const storedUserData = await AsyncStorage.getItem('userData');
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    };
    fetchUserData();
  }, []);

  const handleSearch = () => {
    setSearchParams(searchQuery.trim() ? searchQuery : null);
  };

  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchParams(null);
    }
  }, [searchQuery]);

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className="px-8 my-6 space-y-6">
        <View className="flex-row mb-6 justify-between">
          <View>
            <Text className="text-sm font-pmedium text-white">Welcome Back</Text>
            <Text className="text-2xl font-psemibold text-white">{userData.firstName}</Text>
          </View>
          <View className="flex-row gap-3">
            <Image source={images.logo} className="w-[50] h-[64]" />
            <TouchableOpacity
              className="items-center justify-center"
              onPress={signOut}
            >
              <Ionicons name="log-out-outline" size={50} color="white" />
            </TouchableOpacity>
          </View>
        </View>
        <SearchInput
          value={searchQuery}
          onChangeText={(e) => setSearchQuery(e)}
          onSearch={handleSearch}
          isLoading={isLoading}
        />
      </View>

      {isLoading ? (
        <View className="flex-1 mt-7 items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
      <FlatList
        className="w-full"
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={style.row}
        renderItem={({ item }) => (
          <TouchableOpacity
          onPress={() => {
            const categoryId = item.id;
            if (pathname.startsWith("/Quizzes")) router.setParams({ categoryId});
            else router.push(`/Quizzes/${categoryId}`);
          }}
          >
            <View className="w-[150] h-[150] m-4 bg-secondary-100 rounded-xl justify-center items-center">
              <Text className="text-xl font-psemibold text-secondary-900 text-center">{item.title}</Text>
            </View>
          </TouchableOpacity>

        )}
      />
      )}
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  row: {
    flex: 1,
    justifyContent: "center",
  },
});

export default Home;
