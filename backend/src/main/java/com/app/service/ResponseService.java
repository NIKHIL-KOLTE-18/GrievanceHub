package com.app.service;

import com.app.dto.ResponseDTO;
import com.app.entity.Response;

import java.util.List;

public interface ResponseService {
    Response createResponse(ResponseDTO dto);
    List<Response> getAllResponses();
    Response getResponseById(Long id);
}
