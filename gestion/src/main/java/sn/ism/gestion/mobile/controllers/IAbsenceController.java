package sn.ism.gestion.mobile.controllers;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/pointages")
public interface IAbsenceController {

    @GetMapping("/absences")
    @ApiResponse(responseCode = "200")
    ResponseEntity<Map<String, Object>> SelectAllAbsence(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size);

    @PostMapping("/pointer")
     ResponseEntity<?> pointerEtudiantByQRcode(@RequestParam String sessionId,
                                       @RequestParam String etudiantId);

    @PostMapping("/pointerByMatricule")
    ResponseEntity<?> pointerEtudiantByMatricule(@RequestParam String sessionId,
                                      @RequestParam String matricule);


    @GetMapping("/{etudiantId}")
    ResponseEntity<Map<String,Object>> findAbsencesByEtudiant(@PathVariable String id, 
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size);

    @GetMapping("/{id}/details")
    ResponseEntity<Map<String,Object>> findByDetailsId(@PathVariable String id);

}
