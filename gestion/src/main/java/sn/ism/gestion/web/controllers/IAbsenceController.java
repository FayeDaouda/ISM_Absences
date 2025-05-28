package sn.ism.gestion.web.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Absence;

import java.util.Map;

@RestController
@RequestMapping("/api/absences")
public interface IAbsenceController extends Controller<Absence> {


    @GetMapping("/{etudiantId}")
    ResponseEntity<Map<String,Object>> findAbsencesByEtudiant(@PathVariable String id, 
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size);

    @GetMapping("/{id}/details")
    ResponseEntity<Map<String,Object>> findById(@PathVariable String id);

}
