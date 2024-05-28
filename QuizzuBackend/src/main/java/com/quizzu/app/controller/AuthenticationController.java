package com.quizzu.app.controller;

import com.quizzu.app.dto.AuthenticationRequest;
import com.quizzu.app.dto.AuthenticationResponse;
import com.quizzu.app.dto.RegisterRequest;
import com.quizzu.app.service.AuthenticationService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth")
@CrossOrigin("*")
public class AuthenticationController {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationService authenticationService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) throws Exception {
        System.out.println(registerRequest);
        return ResponseEntity.ok(this.authenticationService.registerUser(registerRequest));
    }

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest authenticateRequest) throws Exception {
        return ResponseEntity.ok(this.authenticationService.authenticate(authenticateRequest));
    }

    @PostMapping("/refreshToken")
    public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody String refToken){
        System.out.println("refreshToken "+refToken);
        return ResponseEntity.ok(this.authenticationService.refreshToken(refToken));
    }
}
