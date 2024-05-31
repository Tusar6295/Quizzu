import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  BackHandler,
} from "react-native";
import {
  useLocalSearchParams,
  useNavigation,
  useFocusEffect,
} from "expo-router";
import { getQuestionsByQuizId } from "../../config/api";
import useData from "../../config/useData";
import { Feather } from "@expo/vector-icons";

const QuestionList = () => {
  const { quizId } = useLocalSearchParams();
  const { data: questions, isLoading } = useData(getQuestionsByQuizId, quizId);
  const navigation = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        BackHandler.exitApp();
        return true;
      };
      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [])
  );

  useEffect(() => {
    if (!isLoading && questions.length > 0) {
      setTimer(10);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    }
  }, [isLoading, questions, currentQuestionIndex]);

  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0 && !isAnswered) {
      handleAnswer(-1);
    }
  }, [timer, isAnswered]);

  const handleAnswer = (index) => {
    if (!isAnswered) {
      setSelectedOptionIndex(index);
      setIsAnswered(true);
      if (
        index !== -1 &&
        questions[currentQuestionIndex].answers[index].correct
      ) {
        setCorrectAnswers(correctAnswers + 1);
      } else if (
        index !== -1 &&
        !questions[currentQuestionIndex].answers[index].correct
      ) {
        setWrongAnswers(wrongAnswers + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
      setTimer(10);
    } else {
      setResultMessage(
        <View>
          <Text className="font-bold text-xl">Quiz Completed!</Text>
          <Text className="text-lg">Correct Answers: {correctAnswers}</Text>
          <Text className="text-lg">Wrong Answers: {wrongAnswers}</Text>
        </View>
      );
      setModalVisible(true);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const restartQuiz = () => {
    setModalVisible(false);
    // Reset the quiz
    setCurrentQuestionIndex(0);
    setTimer(10);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView className="flex-1 h-full bg-primary p-4">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {currentQuestion && (
          <View key={currentQuestion.id} className="mb-4">
            <Text className="text-xl text-center mb-2">
              Question {currentQuestionIndex + 1}/{questions.length}
            </Text>
            <View className="flex-row items-center justify-center mb-4">
              <Feather name="clock" size={20} color="black" className="mr-2" />
              <Text className="text-lg">{timer} seconds remaining</Text>
            </View>
            <Text className="text-2xl text-center mb-4">
              {currentQuestion.title}
            </Text>
            {currentQuestion.answers.map((answer, answerIndex) => (
              <TouchableOpacity
                key={answer.id}
                className={`flex-row items-center justify-between w-full p-4 my-2 rounded-lg ${
                  isAnswered &&
                  answerIndex === selectedOptionIndex &&
                  !answer.correct
                    ? "bg-red-200"
                    : "bg-gray-200"
                } ${isAnswered && answer.correct ? "bg-green-200" : ""}`}
                onPress={() => handleAnswer(answerIndex)}
                disabled={isAnswered}
              >
                <Text className="text-lg">{answer.text}</Text>
                {isAnswered && answer.correct && (
                  <Feather name="check-circle" size={20} color="green" />
                )}
                {isAnswered &&
                  !answer.correct &&
                  answerIndex === selectedOptionIndex && (
                    <Feather name="x-circle" size={20} color="red" />
                  )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity
          className="p-4 bg-gray-200 rounded-lg mt-10"
          onPress={handleNext}
        >
          <Text className="text-lg text-black text-center">Next</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-center items-center bg-transparent">
          <View className="w-4/5 bg-white p-6 rounded-lg items-center">
            {resultMessage}
            <View className="flex-row justify-between mt-10 w-full">
              <TouchableOpacity
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#7C72E5" }}
                onPress={() => navigation.goBack()}
              >
                <Text className="text-lg text-black">Back</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-4 rounded-lg"
                style={{ backgroundColor: "#7C72E5" }}
                onPress={restartQuiz}
              >
                <Text className="text-lg text-black">Restart</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default QuestionList;
