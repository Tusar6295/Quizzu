package com.quizzu.app.dto;

import com.quizzu.app.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class QuestionDto {

    private String title;
    private Long quizId;
    private List<AnswerDto> answers;
}
