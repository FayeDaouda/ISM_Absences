package sn.ism.gestion.mobile.controllers.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.services.IAbsenceService;
import sn.ism.gestion.mobile.controllers.IAbsenceController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/mobile/pointages")
@CrossOrigin(origins = "http://localhost:4200")
public class AbsenceControllerImpl implements IAbsenceController {
    private final IAbsenceService absenceService;


    @Override
    public ResponseEntity<?> pointerEtudiantByMatricule(@RequestParam String sessionId, @RequestParam String matricule) {
        Absence absence = absenceService.pointerEtudiantByMatricule(sessionId, matricule);
        return ResponseEntity.ok().body(absence);
    }

    @Override
    public ResponseEntity<Map<String, Object>> findAbsencesByEtudiant(String id, int page, int size) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> findByDetailsId(String id) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> SelectAllAbsence(int page, int size) {
        return null;
    }

    @Override
    public ResponseEntity<?> pointerEtudiantByQRcode(String sessionId, String etudiantId) {
        return null;
    }

}
