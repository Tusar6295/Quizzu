package com.quizzu.app.controller;

import com.quizzu.app.dto.QuizDto;
import com.quizzu.app.entity.Quiz;
import com.quizzu.app.service.CategoryService;
import com.quizzu.app.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quiz")
@CrossOrigin("*")
public class QuizController {
    @Autowired
    private QuizService quizService;

    @GetMapping("/getQuizList/{categoryId}")
    public ResponseEntity<List<Quiz>> getQuizList(@PathVariable("categoryId") Long categoryId) {
        List<Quiz> quizzes = this.quizService.getQuizzesByCategory(categoryId);
        return ResponseEntity.ok(quizzes);
    }

    @GetMapping("/getAllQuizzes")
    public List<Quiz> getAllQuizzes() {
        return this.quizService.getAllQuizzes();
    }

    @GetMapping("/searchQuiz")
    public List<Quiz> searchQuiz(@RequestParam String searchQuery)
    {
        return this.quizService.searchQuiz(searchQuery);
    }
}
