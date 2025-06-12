package sn.ism.gestion.mobile.controllers.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.mobile.controllers.IVigileController;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/mobile/vigiles")
@CrossOrigin(origins = "http://localhost:4200")
public class VigileController implements IVigileController {

    @Override
    public ResponseEntity<Map<String, Object>> pointerEtudiant(String matricule) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> getAllPointagesDuJour(int page, int size) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllPointagesDuJour'");
    }

}
