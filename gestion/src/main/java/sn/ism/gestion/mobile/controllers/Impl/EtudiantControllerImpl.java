package sn.ism.gestion.mobile.controllers.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.mobile.controllers.IEtudiantController;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/mobile/etudiants")
@CrossOrigin(origins = "http://localhost:4200")
public class EtudiantControllerImpl implements IEtudiantController {

    @Override
    public ResponseEntity<Map<String, Object>> getMyListAbsences(String id, int page, int size) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> findByMatricule(String matricule) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> justifierAbsence(String id, JustificationRequest justification) {
        return null;
    }

   
}