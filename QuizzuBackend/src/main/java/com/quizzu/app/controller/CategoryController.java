package com.quizzu.app.controller;

import com.quizzu.app.entity.Category;
import com.quizzu.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @PostMapping("/addCategory")
    public ResponseEntity<Category> addCategory(String title) throws Exception
    {
        return ResponseEntity.ok(this.categoryService.createCategory(title));
    }
}
