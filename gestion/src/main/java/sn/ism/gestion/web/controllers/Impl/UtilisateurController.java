package sn.ism.gestion.web.controllers.Impl;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.web.controllers.IUtilisateurController;

public class UtilisateurController implements IUtilisateurController {

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
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByLogin'");
    }
    
}
