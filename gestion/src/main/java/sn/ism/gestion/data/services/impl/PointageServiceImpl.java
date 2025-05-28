package sn.ism.gestion.data.services.impl;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.data.entities.Pointage;
import sn.ism.gestion.data.services.IPointageService;

public class PointageServiceImpl implements IPointageService {

    @Override
    public Pointage create(Pointage object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public Pointage update(String id, Pointage object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public boolean delete(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public Pointage findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<Pointage> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Page<Pointage> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Pointage pointerQrCode(String etudiantId, String vigileId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'pointerQrCode'");
    }

    @Override
    public Pointage pointermanuellement(String matriculeEtudiant, String vigileId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'pointermanuellement'");
    }

    @Override
    public Page<Pointage> findByEtudiant(String matricule, Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findByEtudiant'");
    }

   
}
