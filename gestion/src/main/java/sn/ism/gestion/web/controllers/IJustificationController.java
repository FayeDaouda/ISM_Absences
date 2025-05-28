package sn.ism.gestion.web.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;
import sn.ism.gestion.web.dto.Request.JustificationRequest;

@RestController
@RequestMapping("/api/justification")
public interface IJustificationController {

    @PostMapping("")
    ResponseEntity<Map<String, Object>> Create(@Valid @RequestBody JustificationRequest objet,
        BindingResult bindingResult);
    
    
}
