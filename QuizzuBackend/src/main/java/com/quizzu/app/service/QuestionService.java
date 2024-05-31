package com.quizzu.app.service;

import com.quizzu.app.Exception.ResourceNotFoundException;
import com.quizzu.app.dto.AnswerDto;
import com.quizzu.app.dto.QuestionDto;
import com.quizzu.app.entity.Answer;
import com.quizzu.app.entity.Question;
import com.quizzu.app.entity.Quiz;
import com.quizzu.app.repo.AnswerRepository;
import com.quizzu.app.repo.QuestionRepository;
import com.quizzu.app.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private AnswerRepository answerRepository;

    public Question addQuestion(QuestionDto questionDto) throws Exception {
        Quiz quiz = quizRepository.findById(questionDto.getQuizId())
                .orElseThrow(() -> new ResourceNotFoundException("Quiz not found with id: " + questionDto.getQuizId()));

        Question question = new Question();
        question.setTitle(questionDto.getTitle());
        question.setQuiz(quiz);
        Question savedQuestion = questionRepository.save(question);

        for (AnswerDto answerDto : questionDto.getAnswers()) {
            Answer answer = new Answer();
            answer.setText(answerDto.getText());
            answer.setCorrect(answerDto.getIsCorrect());
            answer.setQuestion(savedQuestion);
            answerRepository.save(answer);
        }

        return savedQuestion;
    }

    public List<Question> getAllQuestions(Long id) {
        return this.questionRepository.findByQuizId(id);
    }
}
