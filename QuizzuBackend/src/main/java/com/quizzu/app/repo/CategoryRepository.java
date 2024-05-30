package com.quizzu.app.repo;

import com.quizzu.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    Category findByTitleIgnoreCase(String title);
    List<Category> findByTitleContainingIgnoreCase(String searchQuery);
}
