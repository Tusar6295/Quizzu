import React from "react";
import { View, Text, StyleSheet, Button, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const QuizTile = ({ title, noOfQuestions, onPress }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.questions}>Questions: {noOfQuestions}</Text>
      </View>
      <TouchableOpacity onPress={onPress}>
        <AntDesign name="rightcircleo" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 15,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 15,
    borderColor: "#ccc",
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  content: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  questions: {
    fontSize: 16,
    color: "#555",
  },
  button: {},
});

export default QuizTile;
