package sn.ism.gestion.web.controllers;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/vigil")
public interface IVigileController {

    @PostMapping("/pointer")
    ResponseEntity<Map<String,Object>> pointerEtudiant(
        @RequestParam String matricule );
}
