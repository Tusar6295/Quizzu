import { View, Text, Image, ActivityIndicator } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useData from "../../config/useData";
import { getCategoryById, getQuizzesByCategory } from "../../config/api";
import { FlatList } from "react-native";
import QuizTile from "../../components/QuizTile";
import { images } from "../../constants";
import { useState } from "react";
import { useEffect } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

const QuizList = () => {
  const { categoryId } = useLocalSearchParams();
  const { data: quizList, isLoading } = useData(getQuizzesByCategory, categoryId);
  const [category, setCategory] = useState(null);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categoryData = await getCategoryById(categoryId);
        setCategory(categoryData);
      } catch (error) {
        Alert.alert("Something went wrong. Please try again.");
      }
    };

    fetchCategory();
  }, []);

  const renderItem = ({ item }) => (
    <View className="px-4">
      <QuizTile
        title={item.title}
        noOfQuestions={item.questions.length}
        onPress={() => handlePress(item.id)}
      />
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="my-8 px-6  flex-row justify-between items-center">
        <Text className="text-3xl text-white font-psemibold">{category?.title}</Text>
        <Image source={images.logo} className="w-[50] h-[64]" />
      </View>
      {isLoading ? (
        <View className="flex-1 mt-7 items-center">
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      ) : (
        <FlatList
          data={quizList}
          keyExtractor={(item) => item.id.toString()}
          numColumns={1}
          renderItem={renderItem}
          ListEmptyComponent={() => (
            <View className="flex-1 h-[70vh] gap-2 items-center justify-center">
               <Ionicons 
                  name="list-sharp"
                  size={40}
                  color="white"
               />
              <Text className="text-white text-xl font-psemibold">No Quizzes to show</Text>
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default QuizList;
