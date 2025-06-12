package sn.ism.gestion.data.services.impl;

import java.util.List;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import sn.ism.gestion.data.entities.*;
import sn.ism.gestion.data.repositories.AdminRepository;
import sn.ism.gestion.data.repositories.AbsenceRepository;
import sn.ism.gestion.data.repositories.JustificationRepository;
import sn.ism.gestion.data.services.IAdminService;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements IAdminService {

    @Autowired
    private AdminRepository adminRepository;
    @Autowired
    private AbsenceRepository absenceRepository;
    @Autowired
    private JustificationRepository justificationRepository;

    @Override
    public Admin create(Admin object) {
        return adminRepository.save(object);
    }

    @Override
    public Admin update(String id, Admin object) {
        return adminRepository.findById(id).map(admin -> {
            admin.setUtilisateurId(object.getUtilisateurId());
            return adminRepository.save(admin);
        }).orElse(null);
    }

    @Override
    public boolean delete(String id) {
        if (adminRepository.existsById(id)) {
            adminRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Admin findById(String id) {
        return adminRepository.findById(id).orElse(null);
    }

    @Override
    public List<Admin> findAll() {
        return adminRepository.findAll();
    }

    @Override
    public Page<Admin> findAll(Pageable pageable) {
        return adminRepository.findAll(pageable);
    }

    @Override
    public Page<Absence> getAllAbsences(Pageable pageable) {
        return absenceRepository.findAll(pageable);
    }

    @Override
    public Page<Justification> getAllJustifications(Pageable pageable) {
        return justificationRepository.findAll(pageable);
    }

    @Override
    public Justification traiterJustification(Justification justification) {
        return justificationRepository.save(justification);
    }

}
