package com.app.controller;

import com.app.dto.ResponseDTO;
import com.app.entity.Response;
import com.app.service.ResponseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/responses")
public class ResponseController {

    @Autowired
    private ResponseService responseService;

    @PostMapping
    public Response createResponse(@RequestBody ResponseDTO dto) {
        return responseService.createResponse(dto);
    }

    @GetMapping
    public List<Response> getAllResponses() {
        return responseService.getAllResponses();
    }

    @GetMapping("/{id}")
    public Response getResponseById(@PathVariable Long id) {
        return responseService.getResponseById(id);
    }
}
