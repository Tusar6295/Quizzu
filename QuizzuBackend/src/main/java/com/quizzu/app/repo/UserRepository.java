package com.quizzu.app.repo;

import com.quizzu.app.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    User findByUserEmail(String email);
}
