package com.quizzu.app.repo;

import com.quizzu.app.entity.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCategoryId(Long categoryId);
    List<Quiz> findByTitleContainingIgnoreCase(String searchQuery);
}
