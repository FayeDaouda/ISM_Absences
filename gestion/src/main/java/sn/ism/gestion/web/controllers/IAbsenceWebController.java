package sn.ism.gestion.web.controllers;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.web.dto.Request.AbsenceRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/web/pointages")
public interface IAbsenceWebController extends Controller<Absence> {

    @PostMapping("")
    ResponseEntity<Map<String, Object>> Create(@Valid @RequestBody AbsenceRequest request,
                                               BindingResult bindingResult);
    @GetMapping("/absences")
    @ApiResponse(responseCode = "200")
    ResponseEntity<Map<String, Object>> SelectAllAbsence(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size);

    @GetMapping("/{etudiantId}")
    ResponseEntity<Map<String,Object>> findAbsencesByEtudiant(@PathVariable String id, 
                        @RequestParam(defaultValue = "0") int page,
                        @RequestParam(defaultValue = "10") int size);

    @GetMapping("/absence/{id}")
    ResponseEntity<Map<String,Object>> getAbsenceDetails(@PathVariable String id);

}
