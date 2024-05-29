package com.quizzu.app.controller;

import com.quizzu.app.dto.QuestionDto;
import com.quizzu.app.entity.Question;
import com.quizzu.app.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
 import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/question")
public class QuestionsController {

    @Autowired
    private QuestionService questionService;
    @PostMapping("/createQuestion")
    public ResponseEntity<Question> createQuestion(@RequestBody QuestionDto questionDto) throws Exception
    {
        return ResponseEntity.ok(this.questionService.addQuestion(questionDto));
    }
}
