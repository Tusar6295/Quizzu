package com.quizzu.app.service;

import com.quizzu.app.dto.CategoryDto;
import com.quizzu.app.entity.Category;
import com.quizzu.app.repo.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(CategoryDto categoryDto) throws Exception{
        Category newCategory = this.categoryRepository.findByTitleIgnoreCase(categoryDto.getTitle());
        if(newCategory != null)
        {
            throw new Exception("Category already exists");
        }

        Category category = new Category();
        category.setTitle(categoryDto.getTitle());
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories(){
        return this.categoryRepository.findAll();
    }

    public List<Category> searchCategory(String searchQuery){
        return this.categoryRepository.findByTitleContainingIgnoreCase(searchQuery);
    }

    public Optional<Category> getCategoryById(Long id){
        return this.categoryRepository.findById(id);
    }
}
