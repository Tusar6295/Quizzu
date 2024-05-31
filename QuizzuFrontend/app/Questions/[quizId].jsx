import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams } from 'expo-router';
import { getQuestionsByQuizId } from '../../config/api'; 
import useData from '../../config/useData'; 
import { Feather } from '@expo/vector-icons';

const QuestionList = () => {
  const { quizId } = useLocalSearchParams();
  const { data: questions, isLoading } = useData(getQuestionsByQuizId, quizId); 
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null); 
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(15); // Static timer of 15 seconds
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);

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
      if (index !== -1 && questions[currentQuestionIndex].answers[index].correct) {
        setCorrectAnswers(correctAnswers + 1);
      } else if (index !== -1 && !questions[currentQuestionIndex].answers[index].correct) {
        setWrongAnswers(wrongAnswers + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOptionIndex(null); 
      setTimer(15); // Reset timer to 15 seconds for each question
    } else {
      alert(`Quiz Completed!\nCorrect Answers: ${correctAnswers}\nWrong Answers: ${wrongAnswers}`);
      setCurrentQuestionIndex(0);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
      setTimer(15); // Reset timer to 15 seconds for each question
      setCorrectAnswers(0); 
      setWrongAnswers(0); 
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={{ flex: 1 }} className="h-full bg-primary">
      <ScrollView contentContainerStyle={styles.container}>
        {currentQuestion && (
          <View key={currentQuestion.id}>
            <Text style={styles.questionNumber}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
            <View style={styles.timerContainer}>
              <Feather name="clock" size={20} color="black" style={styles.clockIcon} />
              <Text style={styles.timerText}>{timer} seconds remaining</Text>
            </View>
            <Text style={styles.questionText}>{currentQuestion.title}</Text>
            {currentQuestion.answers.map((answer, answerIndex) => (
              <TouchableOpacity
                key={answer.id}
                style={[
                  styles.optionButton,
                  isAnswered && answerIndex === selectedOptionIndex && !answer.correct && styles.wrongOption,
                  isAnswered && answer.correct && styles.correctOption
                ]}
                onPress={() => handleAnswer(answerIndex)}
                disabled={isAnswered}
              >
                <Text style={styles.optionText}>{answer.text}</Text>
                {isAnswered && answer.correct && (
                  <Feather name="check-circle" size={20} color="green" />
                )}
                {isAnswered && !answer.correct && answerIndex === selectedOptionIndex && (
                  <Feather name="x-circle" size={20} color="red" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        )}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    width: '100%',
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  questionNumber: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  clockIcon: {
    marginRight: 5,
  },
  timerText: {
    fontSize: 18,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 16,
    marginVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    minWidth: '100%',
  },
  optionText: {
    fontSize: 18,
  },
  correctOption: {
    backgroundColor: '#d4edda',
  },
  wrongOption: {
    backgroundColor: '#f8d7da',
  },
  nextButton: {
    marginTop: 40,
    padding: 16,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  nextButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default QuestionList;
