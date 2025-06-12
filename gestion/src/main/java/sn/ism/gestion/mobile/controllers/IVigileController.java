package sn.ism.gestion.mobile.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/vigiles")
public interface IVigileController {

    @PostMapping("/pointer")
    ResponseEntity<Map<String,Object>> pointerEtudiant(
        @RequestParam String matricule );

    @PostMapping("/AllPointagesDuJour")
    ResponseEntity<Map<String, Object>> getAllPointagesDuJour(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size);
}
