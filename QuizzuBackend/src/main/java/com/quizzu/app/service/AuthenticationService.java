package com.quizzu.app.service;

import com.quizzu.app.Exception.InvalidCredentialsException;
import com.quizzu.app.Exception.UsernameAlreadyExistsException;
import com.quizzu.app.config.JwtService;
import com.quizzu.app.dto.AuthenticationRequest;
import com.quizzu.app.dto.AuthenticationResponse;
import com.quizzu.app.dto.RegisterRequest;
import com.quizzu.app.entity.Role;
import com.quizzu.app.entity.User;
import com.quizzu.app.repo.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserDetailsService userDetailsService;

    public User registerUser(RegisterRequest registerRequest) throws Exception{
        System.out.println("inside authenticationservice");
        User user = this.userRepo.findByUserEmail(registerRequest.getUserEmail());
        if(user != null)
        {
            throw new UsernameAlreadyExistsException("User already exists");
        }
        System.out.println("check passed");
        User user1 =  new User();
        user1.setFirstName(registerRequest.getFirstName());
        user1.setUserEmail(registerRequest.getUserEmail());
        user1.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        user1.setRole(Role.USER);

        return this.userRepo.save(user1);
    }

    public AuthenticationResponse authenticate(AuthenticationRequest authenticateRequest) throws Exception
    {
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authenticateRequest.getUserEmail(),authenticateRequest.getPassword()));

            User user = this.userRepo.findByUserEmail(authenticateRequest.getUserEmail());
            var accessToken = this.jwtService.generateToken(user);
            var refreshToken = this.jwtService.generateRefreshToken(user);

            AuthenticationResponse response = new AuthenticationResponse();
            response.setAccessToken(accessToken);
            response.setRefreshToken(refreshToken);
            response.setFirstName(user.getFirstName());
            response.setUserId(user.getId());
            response.setUserEmail(user.getUserEmail());

            return response;
        }catch(BadCredentialsException e){
            throw new InvalidCredentialsException("Invalid username or password");
        }

    }

    public AuthenticationResponse refreshToken(String refreshToken) {
        System.out.println("inside authentication service");
        if (jwtService.validateToken(refreshToken)) {
            String username = jwtService.extractUsername(refreshToken);
            User user = userRepo.findByUserEmail(username);
            String newAccessToken = jwtService.generateToken(user);
            AuthenticationResponse response = new AuthenticationResponse();
            response.setAccessToken(newAccessToken);
            response.setRefreshToken(refreshToken);
            response.setFirstName(user.getFirstName());
            response.setUserId(user.getId());
            response.setUserEmail(user.getUserEmail());

            return response;
        } else {
            throw new RuntimeException("Invalid refresh token");
        }
    }



}
