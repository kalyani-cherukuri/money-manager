package com.example.moneymanager.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.moneymanager.entity.ProfileEntity;

public interface ProfileRepository extends JpaRepository<ProfileEntity,Long>{
     
    Optional<ProfileEntity>findByEmail(String email);
    Optional<ProfileEntity>findByActivationToken(String activationToken);
}
 