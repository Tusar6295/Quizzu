package com.quizzu.app.controller;

import com.quizzu.app.entity.Category;
import com.quizzu.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping("/category")
@CrossOrigin
public class CategoryController {

    @Autowired
    private CategoryService categoryService;


    @GetMapping("/getCategories")
    public ResponseEntity<List<Category>> getCategories()
    {
        return ResponseEntity.ok(this.categoryService.getAllCategories());
    }

}
