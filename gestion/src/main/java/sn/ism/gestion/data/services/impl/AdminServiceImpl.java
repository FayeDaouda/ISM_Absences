package sn.ism.gestion.data.services.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Admin;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.services.IAdminService;

public class AdminServiceImpl implements IAdminService {

    @Override
    public Admin create(Admin object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public Admin update(String id, Admin object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public boolean delete(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public Admin findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<Admin> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Page<Admin> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Page<Absence> getAllAbsences(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllAbsences'");
    }

    @Override
    public Page<Justification> getAllJustifications(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAllJustifications'");
    }

    @Override
    public Justification traiterJustification(Justification justification) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'traiterJustification'");
    }
    
}
