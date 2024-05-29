package com.quizzu.app.repo;

import com.quizzu.app.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<Category,Long> {

    Category findByTitleIgnoreCase(String title);
}
