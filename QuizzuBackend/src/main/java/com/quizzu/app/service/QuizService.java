package com.quizzu.app.service;

import com.quizzu.app.dto.QuizDto;
import com.quizzu.app.entity.Category;
import com.quizzu.app.entity.Quiz;
import com.quizzu.app.repo.CategoryRepository;
import com.quizzu.app.repo.QuizRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuizService {

    @Autowired
    private QuizRepository quizRepository;

    @Autowired
    private CategoryRepository categoryRepository;
    public Quiz createQuiz(QuizDto quizDto){
        Quiz quiz = new Quiz();
        Category category = this.categoryRepository.findByTitleIgnoreCase(quizDto.getCategory());

        quiz.setCategory(category);
        quiz.setTitle(quizDto.getTitle());
        quiz.setTimeLimit(quizDto.getTimeLimit());

        return this.quizRepository.save(quiz);
    }
}