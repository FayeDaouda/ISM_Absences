package sn.ism.gestion.mobile.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/justifications")
public interface IJustificationController {

    
    @PostMapping("")
    ResponseEntity<Map<String, Object>> Create(@Valid @RequestBody JustificationRequest objet,
        BindingResult bindingResult);
    
    
}
