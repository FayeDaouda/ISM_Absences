package sn.ism.gestion.web.controllers;

import java.util.Map;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Etudiant;

@RestController
@RequestMapping("/api/etudiants")
public interface IEtudiantController extends Controller<Etudiant> {

    @GetMapping("/absences/{id}")
    ResponseEntity<Map<String,Object>> getMyListAbsences(@PathVariable String id, 
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size);

    @GetMapping("/matricule/{matricule}")
    ResponseEntity<Map<String,Object>> findByMatricule(@PathVariable String matricule);

    // @PostMapping("/absences/{absenceId}/justifier")
    // ResponseEntity<Map<String,Object>> justifierAbsence(@PathVariable String absenceId, @RequestBody Justification justification);
}
