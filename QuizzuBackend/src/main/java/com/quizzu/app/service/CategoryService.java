package com.quizzu.app.service;

import com.quizzu.app.entity.Category;
import com.quizzu.app.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(String title) throws Exception{
        Category newCategory = this.categoryRepository.findByTitleIgnoreCase(title);
        if(newCategory != null)
        {
            throw new Exception("Category already exists");
        }

        Category category = new Category();
        category.setTitle(title);
        return categoryRepository.save(category);
    }
}
