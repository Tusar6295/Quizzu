package com.quizzu.app.controller;

import com.quizzu.app.dto.QuestionDto;
import com.quizzu.app.dto.RegisterRequest;
import com.quizzu.app.entity.Question;
import com.quizzu.app.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/question")
public class QuestionsController {

    @Autowired
    private QuestionService questionService;

    @GetMapping("/getQuestions")
    public ResponseEntity<?> register(@RequestParam Long id) {
        return ResponseEntity.ok(this.questionService.getAllQuestions(id));
    }
}
