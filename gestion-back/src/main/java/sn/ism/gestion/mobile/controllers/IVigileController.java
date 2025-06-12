package sn.ism.gestion.mobile.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.web.dto.Request.VigileSimpleRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/vigiles")
public interface IVigileController extends Controller<Vigile> {

    @PostMapping("")
    ResponseEntity<Map<String, Object>> Create(@Valid @RequestBody VigileSimpleRequest request,
                                               BindingResult bindingResult);

    @PostMapping("/pointer")
    ResponseEntity<Map<String,Object>> pointerEtudiant(
        @RequestParam String matricule );

    @PostMapping("/AllPointagesDuJour")
    ResponseEntity<Map<String, Object>> getAllPointagesDuJour(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size);
}
