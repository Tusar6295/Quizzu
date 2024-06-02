import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  SafeAreaView,
  BackHandler,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import {
  useLocalSearchParams,
  useNavigation,
  useFocusEffect,
} from "expo-router";
import { getQuestionsByQuizId } from "../../config/api";
import useData from "../../config/useData";
import { Feather, FontAwesome, Ionicons } from "@expo/vector-icons";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const QuestionList = () => {
  const { quizId } = useLocalSearchParams();
  const { data: questions, isLoading } = useData(getQuestionsByQuizId, quizId);
  const navigation = useNavigation();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(15);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

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
      const shuffledQs = shuffleArray([...questions]).map((question) => ({
        ...question,
        answers: shuffleArray([...question.answers]),
      }));
      setShuffledQuestions(shuffledQs);
      setTimer(15);
      setSelectedOptionIndex(null);
      setIsAnswered(false);
    }
  }, [isLoading, questions]);

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
        shuffledQuestions[currentQuestionIndex].answers[index].correct
      ) {
        setCorrectAnswers(correctAnswers + 1);
      } else if (
        index !== -1 &&
        !shuffledQuestions[currentQuestionIndex].answers[index].correct
      ) {
        setWrongAnswers(wrongAnswers + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
      setTimer(15);
    } else {
      setResultMessage(
        <View className="flex-row justify-between">
          <View>
            <View className="mb-2">
              <Text className="text-2xl text-[#A42FC1] font-bold">
                <Ionicons name="ellipse" /> {shuffledQuestions.length}
              </Text>
              <Text className="text-lg text-[#A42FC1]">Total Questions</Text>
            </View>
            <View className="mb-2">
              <Text className="text-2xl text-green-500 font-bold">
                <Ionicons name="ellipse" /> {correctAnswers}
              </Text>
              <Text className="text-lg text-green-500">Correct</Text>
            </View>
          </View>
          <View className="">
            <View className="mb-2">
              <Text className="text-2xl text-[#A42FC1] font-bold">
                <Ionicons name="ellipse" />{" "}
                {shuffledQuestions.length - (correctAnswers + wrongAnswers)}
              </Text>
              <Text className="text-lg text-[#A42FC1]">Unattempted</Text>
            </View>
            <View className="mb-2">
              <Text className="text-2xl text-red-500 font-bold">
                <Ionicons name="ellipse" /> {wrongAnswers}
              </Text>
              <Text className="text-lg text-red-500">Wrong</Text>
            </View>
          </View>
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
    const shuffledQs = shuffleArray([...questions]).map((question) => ({
      ...question,
      answers: shuffleArray([...question.answers]),
    }));
    setShuffledQuestions(shuffledQs);
    setCurrentQuestionIndex(0);
    setTimer(15);
    setCorrectAnswers(0);
    setWrongAnswers(0);
  };

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <SafeAreaView className="h-full bg-primary">
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#fff" />
          </View>
        ) : (
          currentQuestion && (
            <View key={currentQuestion.id} className="mb-4 mt-10 px-8">
              <View className="bg-white p-4 py-8 mb-12 rounded-3xl relative">
                <View className="absolute -top-[30] left-[45%] w-[65] h-[65] justify-center rounded-full items-center bg-white">
                  <AnimatedCircularProgress
                    size={50}
                    width={5}
                    fill={(timer / 15) * 100}
                    tintColor="#A42FC1"
                    backgroundColor="#D5D5D5"
                    style={{ backgroundColor: "white", borderRadius: 30 }}
                  >
                    {() => (
                      <Text className="text-base text-secondary-900 font-psemibold ">
                        {timer}
                      </Text>
                    )}
                  </AnimatedCircularProgress>
                </View>
                <Text className="text-xl text-center text-[#A42FC1] my-4">
                  Question {currentQuestionIndex + 1}/{shuffledQuestions.length}
                </Text>
                <Text className="text-2xl text-center font-pmedium">
                  {currentQuestion.title.charAt(0).toUpperCase() +
                    currentQuestion.title.slice(1)}{" "}
                  ?
                </Text>
              </View>
              {currentQuestion.answers.map((answer, answerIndex) => (
                <TouchableOpacity
                  key={answer.id}
                  className={`flex-row items-center justify-between w-full p-5 my-3 rounded-xl ${isAnswered &&
                      answerIndex === selectedOptionIndex &&
                      !answer.correct
                      ? "bg-red-50 border-2 border-red-500"
                      : "bg-white"
                    } ${isAnswered && answer.correct
                      ? "bg-green-50 border-2 border-green-500"
                      : ""
                    }`}
                  onPress={() => handleAnswer(answerIndex)}
                  disabled={isAnswered}
                >
                  <Text className="text-lg font-psemibold">{answer.text}</Text>
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
              {!isLoading && (
                <TouchableOpacity
                  className="p-4 bg-secondary-200 rounded-xl mt-10  flex-row items-center justify-center"
                  onPress={handleNext}
                >
                  <Text className="text-xl font-psemibold text-black text-center mr-2">
                    Next
                  </Text>
                  <Ionicons name="chevron-forward-outline" size={22} />
                </TouchableOpacity>
              )}
            </View>
          )
        )}


        <Modal
          animationType="slide"
          transparent={false}
          visible={modalVisible}
          onRequestClose={closeModal}
        >
          <View className="flex-1 justify-center items-center bg-primary">
            <View className="w-[80vw] bg-white p-6 rounded-3xl">
              <Text className="text-2xl text-center font-psemibold text-secondary mb-6">
                Your score: {correctAnswers * 10}
              </Text>
              {resultMessage}
              <View className="flex-row justify-between mt-10 w-full">
                <View className="items-center">
                  <TouchableOpacity
                    className="w-[60] h-[60] rounded-full justify-center items-center"
                    style={{ backgroundColor: "#7C72E5" }}
                    onPress={() => navigation.goBack()}
                  >
                    <Ionicons name="arrow-back-circle" size={30} color="white" />
                  </TouchableOpacity>
                  <Text className="text-base text-center font-psemibold mt-2">
                    Go back
                  </Text>
                </View>

                <View className="items-center">
                  <TouchableOpacity
                    className=" w-[60] h-[60]  rounded-full justify-center items-center"
                    style={{ backgroundColor: "#7C72E5" }}
                    onPress={() => navigation.navigate("home")}
                  >
                    <Ionicons name="home" size={30} color="white" />
                  </TouchableOpacity>
                  <Text className="text-base text-center font-psemibold mt-2">
                    Home
                  </Text>
                </View>

                <View className="items-center">
                  <TouchableOpacity
                    className=" w-[60] h-[60]  rounded-full justify-center items-center"
                    style={{ backgroundColor: "#7C72E5" }}
                    onPress={restartQuiz}
                  >
                    <FontAwesome name="refresh" size={30} color="white" />
                  </TouchableOpacity>
                  <Text className="text-base text-center font-psemibold mt-2">
                    Play Again
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuestionList;
