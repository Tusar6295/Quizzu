import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const QuizTile = ({ title, noOfQuestions, onPress }) => {
  return (
    <View className="w-full h-[90] bg-white mb-4 justify-between rounded-2xl p-2 px-5 flex-row items-center">
      <View className="">
        <Text className="font-psemibold text-lg ">{title}</Text>
        <Text className="text-base text-gray-600">{noOfQuestions} questions</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="rightcircleo" size={24} color="#7C72E5" />
      </TouchableOpacity>
    </View>
  );
};


export default QuizTile;
