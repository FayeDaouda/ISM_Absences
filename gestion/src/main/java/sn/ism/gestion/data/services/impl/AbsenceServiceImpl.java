package sn.ism.gestion.data.services.impl;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.repositories.EtudiantRepository;
import sn.ism.gestion.data.services.IAbsenceService;
import sn.ism.gestion.web.dto.Response.AbsenceAllResponse;

public class AbsenceServiceImpl implements IAbsenceService{

    private EtudiantRepository repo; 

    @Override
    public Absence create(Absence object) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'create'");
    }

    @Override
    public List<Absence> findAbsencesByEtudiant(String matricule) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAbsencesByStudent'");
    }

    @Override
    public Absence update(String id, Absence absence) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'update'");
    }

    @Override
    public boolean delete(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'delete'");
    }

    @Override
    public Absence findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public List<Absence> findAll() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

    @Override
    public Page<Absence> findAll(Pageable pageable) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findAll'");
    }

   
     public AbsenceAllResponse toDto(Absence absence) {
        Etudiant etudiant = repo.findById(absence.getEtudiantId())
            .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));

        AbsenceAllResponse dto = new AbsenceAllResponse(absence);
        dto.setEtudiantFullName(etudiant.getNom(), etudiant.getPrenom());

        return dto;
    }
}
