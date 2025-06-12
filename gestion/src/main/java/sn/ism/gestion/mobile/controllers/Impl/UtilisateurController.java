package sn.ism.gestion.mobile.controllers.Impl;

import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sn.ism.gestion.mobile.controllers.IUtilisateurController;


@RequiredArgsConstructor
@RestController
@RequestMapping("/api/mobile/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController implements IUtilisateurController {

    @Override
    public ResponseEntity<Map<String, Object>> findByLogin(String login) {
        return null;
    }

}