package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.User;
import com.app.enums.UserRoleEnum;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsernameAndRole(Long username, UserRoleEnum role);
    Optional<User> findByUsername(Long username);
}
