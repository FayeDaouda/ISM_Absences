package sn.ism.gestion.mobile.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/etudiants")
public interface IEtudiantController {

    @GetMapping("/{id}/absences")
    ResponseEntity<Map<String,Object>> getMyListAbsences(@PathVariable String id, 
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size);

    @GetMapping("/matricule/{matricule}")
    ResponseEntity<Map<String,Object>> findByMatricule(@PathVariable String matricule);

     @PostMapping("/{id}/justificationAbsence")
     ResponseEntity<Map<String,Object>> justifierAbsence(
             @PathVariable String id ,
             @RequestBody JustificationRequest justification);
}
