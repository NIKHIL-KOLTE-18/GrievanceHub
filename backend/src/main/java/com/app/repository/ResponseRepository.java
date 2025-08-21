package com.app.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.app.entity.Response;

public interface ResponseRepository extends JpaRepository<Response, Long> {
}
