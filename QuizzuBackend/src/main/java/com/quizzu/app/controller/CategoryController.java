package com.quizzu.app.controller;

import com.quizzu.app.entity.Category;
import com.quizzu.app.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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

    @GetMapping("/searchCategory")
    public ResponseEntity<List<Category>> searchCategory(@RequestParam String searchQuery)
    {
        return ResponseEntity.ok(this.categoryService.searchCategory(searchQuery));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Category>> getTitle(@PathVariable("id") Long id)
    {
        return ResponseEntity.ok(this.categoryService.getCategoryById(id));
    }
}
