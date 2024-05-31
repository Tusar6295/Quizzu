import { View, Text, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import useData from '../../config/useData'
import { useState } from 'react'
import { getAllQuizzes, searchByQuiz } from '../../config/api'
import SearchInput from '../../components/SearchInput'
import { useEffect } from 'react'
import QuizTile from '../../components/QuizTile'
import { router, usePathname } from 'expo-router'

const Quiz = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useState(null);
  const { data: quizList, isLoading, refetch } = useData(searchParams ? searchByQuiz : getAllQuizzes, searchParams);
  const pathname = usePathname();

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
      <View className="px-8">
        <View className=" my-6 space-y-6">
          <View className="flex-row mb-6 justify-between">
            <View>
              <Text className="text-2xl font-psemibold text-white">All Quizzes</Text>
            </View>
          </View>
          <SearchInput
            value={searchQuery}
            onChangeText={(e) => setSearchQuery(e)}
            placeholder="Search for a quiz"
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
            data={quizList}
            keyExtractor={(item) => item.id.toString()}
            numColumns={1}
            renderItem={({ item }) => (
              <QuizTile
                title={item.title}
                noOfQuestions={item.questions.length}
                onPress={() => {
                  const quizId = item.id;
                  if (pathname.startsWith("/Questions"))
                    router.setParams({ quizId });
                  else router.push(`/Questions/${quizId}`);
                }}
              />
            )}
          />
        )}

      </View>

      <StatusBar backgroundColor='#7C72E5' style='light' />
    </SafeAreaView>
  )
}

export default Quiz