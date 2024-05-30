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
<<<<<<< HEAD

    @GetMapping("/getAllQuizzes")
    public List<Quiz> getAllQuizzes()
    {
        return this.quizService.getAllQuizzes();
=======
    @GetMapping("/getQuizList/{categoryId}")
    public ResponseEntity<List<Quiz>> getQuizList(@PathVariable("categoryId") Long categoryId){
        List<Quiz> quizzes = this.quizService.getQuizzesByCategory(categoryId);
        return ResponseEntity.ok(quizzes);
>>>>>>> 0a09e2495fc2a36c1edd9940a40497bd6619ac53
    }
}


