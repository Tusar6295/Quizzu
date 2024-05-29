package com.quizzu.app.controller;

import com.quizzu.app.dto.QuizDto;
import com.quizzu.app.entity.Quiz;
import com.quizzu.app.service.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/quizzes")
@CrossOrigin("*")
public class QuizController {

    @Autowired
    private QuizService quizService;

    @PostMapping
    public ResponseEntity<Quiz> createQuiz(@RequestBody QuizDto quizDto) {
        return ResponseEntity.ok(this.quizService.createQuiz(quizDto));
    }





}
