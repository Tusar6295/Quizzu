package com.quizzu.app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthenticationResponse {

    private Long userId;
    private String firstName;
    private String userEmail;
    private String accessToken;
    private String refreshToken;
}
