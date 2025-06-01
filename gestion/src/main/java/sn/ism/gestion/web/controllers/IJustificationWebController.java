package sn.ism.gestion.web.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.web.dto.Request.JustificationTraitementRequest;
import sn.ism.gestion.web.dto.Request.JustificationValidationRequest;

@RestController
@RequestMapping("/api/web/justifications")
public interface IJustificationWebController extends Controller<Justification> {


    @PutMapping("/{id}/traitement")
    ResponseEntity<Map<String,Object>> traiterJustification(
            @PathVariable String id,
            @RequestParam JustificationTraitementRequest request
    );
}
