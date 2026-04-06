package com.example.moneymanager.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.moneymanager.service.DashboardService;

import java.util.Map;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class DashboardController{

    private final DashboardService dashboardService;

    @GetMapping
    public ResponseEntity<Map<String, Object>> getDashboardData() {
        Map<String, Object> dashboardData = dashboardService.getDashboardData();
        return ResponseEntity.ok(dashboardData);
    }
}
