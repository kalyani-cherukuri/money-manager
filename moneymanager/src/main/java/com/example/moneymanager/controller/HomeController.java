package com.example.moneymanager.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/status","/health"})
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {
    @GetMapping
    public String healthcheck(){
        return "Application is Running";
    }
}
