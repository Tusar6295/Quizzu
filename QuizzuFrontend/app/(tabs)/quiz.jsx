import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Svg, { Circle, Line } from 'react-native-svg';

const questions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctOptionIndex: 2,
  },
  {
    id: '2',
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Jane Austen', 'Mark Twain', 'Ernest Hemingway'],
    correctOptionIndex: 0,
  },
  {
    id: '3',
    question: 'What is the smallest planet in our solar system?',
    options: ['Earth', 'Mars', 'Mercury', 'Venus'],
    correctOptionIndex: 2,
  },
  {
    id: '4',
    question: 'What is the chemical symbol for water?',
    options: ['O2', 'H2O', 'CO2', 'NaCl'],
    correctOptionIndex: 1,
  },
  {
    id: '5',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Claude Monet'],
    correctOptionIndex: 2,
  },
];

const Quiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timer, setTimer] = useState(10);

  useEffect(() => {
    if (timer > 0 && !isAnswered) {
      const timerId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timerId);
    } else if (timer === 0 && !isAnswered) {
      handleAnswer(-1);  // No answer selected
    }
  }, [timer, isAnswered]);

  const handleAnswer = (index) => {
    setSelectedOptionIndex(index);
    setIsAnswered(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
      setTimer(10);
    } else {
      alert("Quiz Completed!");
      setCurrentQuestionIndex(0);
      setIsAnswered(false);
      setSelectedOptionIndex(null);
      setTimer(10);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const getRotation = () => {
    const totalDuration = 10;
    return (timer / totalDuration) * 360;
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="h-full bg-primary">
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.questionNumberText}>Question {currentQuestionIndex + 1}/{questions.length}</Text>
          <View style={styles.timerContainer}>
            <Svg height="50" width="50" viewBox="0 0 50 50">
              <Circle cx="25" cy="25" r="20" stroke="black" strokeWidth="2.5" fill="white" />
              <Line
                x1="25"
                y1="25"
                x2="25"
                y2="5"
                stroke="red"
                strokeWidth="2.5"
                transform={`rotate(${getRotation()}, 25, 25)`}
              />
            </Svg>
            <Text style={styles.timerText}>{timer}</Text>
          </View>
        </View>
        <Text style={styles.questionText}>{currentQuestion.question}</Text>
        {currentQuestion.options.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionButton,
              isAnswered && index === currentQuestion.correctOptionIndex && styles.correctOption,
              isAnswered && index === selectedOptionIndex && index !== currentQuestion.correctOptionIndex && styles.wrongOption
            ]}
            onPress={() => handleAnswer(index)}
            disabled={isAnswered}
          >
            <Text style={styles.optionText}>{option}</Text>
            {isAnswered && index === currentQuestion.correctOptionIndex && (
              <Svg height="20" width="20">
                <Circle cx="10" cy="10" r="8" stroke="green" strokeWidth="2" fill="none" />
                <Line x1="6" y1="10" x2="10" y2="14" stroke="green" strokeWidth="2" />
                <Line x1="10" y1="14" x2="14" y2="6" stroke="green" strokeWidth="2" />
              </Svg>
            )}
            {isAnswered && index === selectedOptionIndex && index !== currentQuestion.correctOptionIndex && (
              <Svg height="20" width="20">
                <Circle cx="10" cy="10" r="8" stroke="red" strokeWidth="2" fill="none" />
                <Line x1="6" y1="6" x2="14" y2="14" stroke="red" strokeWidth="2" />
                <Line x1="14" y1="6" x2="6" y2="14" stroke="red" strokeWidth="2" />
              </Svg>
            )}
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
          <Text style={styles.nextButtonText}>Next</Text>
        </TouchableOpacity>
      </ScrollView>
      <StatusBar backgroundColor='#7C72E5' style='light' />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  questionNumberText: {
    fontSize: 20,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerText: {
    fontSize: 20,
    marginLeft: 8,
    color: 'black',
  },
  questionText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
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

export default Quiz;
