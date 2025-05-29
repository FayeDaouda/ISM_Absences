package sn.ism.gestion.web.controllers.Impl;

import java.util.Map;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.services.IUtilisateurService;
import sn.ism.gestion.utils.mapper.UtilisateurMapper;
import sn.ism.gestion.web.controllers.IUtilisateurController;
import sn.ism.gestion.web.dto.Response.RestResponse;
import sn.ism.gestion.web.dto.Response.UtilisateurSimpleResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController implements IUtilisateurController {

    private final IUtilisateurService utilisateurService;
    private final UtilisateurMapper utilisateurMapper;


    @Override
    public ResponseEntity<Map<String, Object>> SelectAll(int page, int size) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'SelectAll'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> SelectdById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'SelectdById'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> Update(String id, Utilisateur objet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'Update'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> Delete(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'Delete'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> findByLogin(String login) {
        Optional<Utilisateur> utilisateur = utilisateurService.findByLogin(login);
        UtilisateurSimpleResponse dto = utilisateurMapper.toDto(utilisateur);
        return new ResponseEntity<>(
                RestResponse.response(HttpStatus.OK, dto, "UtilisateurSimpleResponse"),
                HttpStatus.OK);
    }
    
}
