package sn.ism.gestion.data.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import sn.ism.gestion.data.entities.*;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.enums.Situation;
import sn.ism.gestion.data.repositories.*;
import sn.ism.gestion.data.services.IEtudiantService;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;
import sn.ism.gestion.utils.exceptions.EntityNotFoundExecption;

@Service
@RequiredArgsConstructor
public class EtudiantServiceImpl implements IEtudiantService {
    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private AbsenceRepository absenceRepository;
    
    @Autowired
    private JustificationServiceImpl justificationServiceImpl;

    @Override
    public Etudiant create(Etudiant object) {
        return null;
    }

    @Override
    public Etudiant update(String id, Etudiant object) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundExecption("Étudiant non trouvé"));
        etudiant.setMatricule(object.getMatricule());
        return etudiantRepository.save(etudiant);
    }

    @Override
    public boolean delete(String id) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElse(null);
        if (etudiant != null) {
            etudiantRepository.delete(etudiant);
            return true;
        }
        return false;
    }

    @Override
    public Etudiant findById(String id) {
        return etudiantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundExecption("Étudiant non trouvé"));
    }

    @Override
    public List<Etudiant> findAll() {
        return etudiantRepository.findAll();
    }

    @Override
    public Page<Etudiant> findAll(Pageable pageable) {
        return etudiantRepository.findAll(pageable);
    }

    @Override
    public Etudiant getByMatricule(String matricule) {
        return etudiantRepository.findByMatricule(matricule)
                .orElseThrow(() -> new EntityNotFoundExecption("Étudiant avec ce matricule non trouvé"));
    }

    @Override
    public Absence justifierAbsence(String absenceId, JustificationRequest justification) {
        Absence absence = absenceRepository.findById(absenceId)
                .orElseThrow(() -> new EntityNotFoundExecption("Pointage non trouvée"));
        if (absence.getType()!=Situation.ABSENCE){
            throw new EntityNotFoundExecption("Pas une Absence");
        }
        Justification justificationCreate = justification.toJustification();
        justificationCreate.setAbsenceId(absence.getId());
        absence.setJustifiee(true);
        justificationServiceImpl.createJustication(justification);
        return absenceRepository.save(absence);
    }

    @Override
    public Page<Absence> getAbsencesByEtudiantId(String etudiantId, Pageable pageable) {
        return absenceRepository.findByEtudiantIdAndType(etudiantId, Situation.ABSENCE, pageable);
    }

}