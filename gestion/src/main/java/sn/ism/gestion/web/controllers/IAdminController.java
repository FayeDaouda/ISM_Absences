package sn.ism.gestion.web.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
public interface IAdminController {
    
    @PutMapping("/{absenceId}/valider")
    ResponseEntity<Map<String,Object>> validerJustification(
        @PathVariable String absenceId, 
        @RequestParam boolean valider
    );
}
