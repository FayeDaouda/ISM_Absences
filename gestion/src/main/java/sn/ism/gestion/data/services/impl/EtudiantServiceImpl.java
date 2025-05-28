package sn.ism.gestion.data.services.impl;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.services.IEtudiantService;


public class EtudiantServiceImpl implements IEtudiantService {

    @Override
    public Etudiant create(Etudiant object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public Etudiant update(String id, Etudiant object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public boolean delete(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public Etudiant findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<Etudiant> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Page<Etudiant> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Etudiant getByMatricule(String matricule) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getByMatricule'");
    }

    @Override
    public Absence justifierAbsence(String absenceId, String justificatif) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'justifierAbsence'");
    }

    @Override
    public Page<Absence> getMylistAbsences(String etudiantId, Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getMylistAbsences'");
    }


  
    
}
