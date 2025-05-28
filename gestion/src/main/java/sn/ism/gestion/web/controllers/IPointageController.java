package sn.ism.gestion.web.controllers;

import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import sn.ism.gestion.data.entities.Pointage;

@RestController
@RequestMapping("/api/pointage")
public interface IPointageController {
    
   

    @PostMapping("/qr-scan")
    ResponseEntity<Pointage> pointerQrCode(
        @RequestParam String studentId,
        @RequestParam String vigileId
    );

    @PostMapping("/manuel")
    ResponseEntity<Map<String,Object>> pointerManuellement(
        @RequestParam String matricule,
        @RequestParam String vigileId
    );
}
