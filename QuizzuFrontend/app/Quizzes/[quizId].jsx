import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useData from "../../config/useData";
import { getQuizzesByCategory } from "../../config/api";
import { FlatList } from "react-native";

const QuizList = () => {
  const { categoryId } = useLocalSearchParams();
  console.log(categoryId);
  const { data: quizList } = useData(getQuizzesByCategory, categoryId);

  const renderItem = ({ item }) => (
    <View style={{ padding: 20, borderBottomWidth: 1 }}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <SafeAreaView className="bg-primary h-full">
      <FlatList
        data={quizList}
        keyExtractor={(item) => item.id.toString()}
        numColumns={1}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default QuizList;
