import { View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams, usePathname, router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useData from "../../config/useData";
import { getQuizzesByCategory } from "../../config/api";
import { FlatList } from "react-native";
import QuizTile from "../../components/QuizTile";

const QuizList = () => {
  const { categoryId } = useLocalSearchParams();
  const { data: quizList } = useData(getQuizzesByCategory, categoryId);
  const pathname = usePathname();

  const handlePress = (quizId) => {
    console.log("quizId: " + quizId);
  };

  const renderItem = ({ item }) => (
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
