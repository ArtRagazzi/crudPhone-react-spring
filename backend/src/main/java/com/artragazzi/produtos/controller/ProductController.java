package com.artragazzi.produtos.controller;


import com.artragazzi.produtos.model.entities.Product;
import com.artragazzi.produtos.service.ProductService;
import jakarta.servlet.Servlet;
import org.hibernate.Remove;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/produtos")
    public ResponseEntity<List<Product>> findAll(){
        List<Product> list = productService.findAll();
        return ResponseEntity.ok().body(list);
    }
    @PostMapping("/insert")
    public ResponseEntity<?> insert(@RequestBody Product obj){
        return productService.insert(obj);
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> update(@PathVariable Long id, @RequestBody Product obj){
        return productService.update(id, obj);
    }

    @DeleteMapping("/remove/{id}")
    public ResponseEntity<?> remove(@PathVariable Long id){
        return productService.remove(id);
    }

}
