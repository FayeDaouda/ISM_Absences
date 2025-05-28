package sn.ism.gestion.web.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/sessions")
public interface ISessionCoursController {

    @GetMapping("/du-jour")
    ResponseEntity<Map<String,Object>> getSessionsDuJour();

    @GetMapping("/{id}")
    ResponseEntity<Map<String,Object>> findById(@PathVariable String id);
}
