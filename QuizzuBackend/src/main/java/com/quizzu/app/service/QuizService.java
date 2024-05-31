package com.quizzu.app.service;

import com.quizzu.app.dto.QuizDto;
import com.quizzu.app.entity.Category;
import com.quizzu.app.entity.Quiz;
import com.quizzu.app.repo.CategoryRepository;
import com.quizzu.app.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

import java.util.List;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    public Quiz createQuiz(QuizDto quizDto) {
        Quiz quiz = new Quiz();
        Category category = this.categoryRepository.findByTitleIgnoreCase(quizDto.getCategory());

        quiz.setCategory(category);
        quiz.setTitle(quizDto.getTitle());
        quiz.setTimeLimit(quizDto.getTimeLimit());

        return this.quizRepository.save(quiz);
    }

    public List<Quiz> getQuizzesByCategory(Long categoryId) {
        List<Quiz> quizList = this.quizRepository.findByCategoryId(categoryId);

        return quizList.stream()
                .filter(quiz -> !quiz.getQuestions().isEmpty())
                .toList();
    }

    public List<Quiz> getAllQuizzes()
    {
        List<Quiz> quizList = this.quizRepository.findAll();

        return quizList.stream()
                .filter(quiz -> !quiz.getQuestions().isEmpty())
                .toList();
    }

    public List<Quiz> searchQuiz(String searchQuery)
    {
        List<Quiz> quizList = this.quizRepository.findByTitleContainingIgnoreCase(searchQuery);
        return quizList.stream()
                .filter(quiz -> !quiz.getQuestions().isEmpty())
                .toList();
    }
}