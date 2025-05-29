package sn.ism.gestion.data.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.repositories.AbsenceRepository;
import sn.ism.gestion.data.repositories.EtudiantRepository;
import sn.ism.gestion.data.services.IAbsenceService;



@Service
public class AbsenceServiceImpl implements IAbsenceService {

    @Autowired
    private AbsenceRepository absenceRepository;
      @Autowired
    private EtudiantRepository etudiantRepository;

    @Override
    public Absence create(Absence object) {
        return absenceRepository.save(object);
    }

    @Override
    public Page<Absence> findAbsencesByEtudiant(String matricule, Pageable pageable) {
        Etudiant etudiant = etudiantRepository.findByMatricule(matricule)
                .orElseThrow(() -> new RuntimeException("Étudiant non trouvé avec le matricule : " + matricule));
        return absenceRepository.findByEtudiantId(etudiant.getId(),pageable);
    }

    @Override
    public Absence update(String id, Absence absence) {
        Absence existing = absenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Absence non trouvée avec ID : " + id));
        absence.setId(existing.getId()); // Assure que c'est un update
        return absenceRepository.save(absence);
    }

    @Override
    public boolean delete(String id) {
        if (!absenceRepository.existsById(id)) {
            return false;
        }
        absenceRepository.deleteById(id);
        return true;
    }

    @Override
    public Absence findById(String id) {
        return absenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Absence non trouvée avec ID : " + id));
    }

    @Override
    public List<Absence> findAll() {
        return absenceRepository.findAll();
    }

    @Override
    public Page<Absence> findAll(Pageable pageable) {
        return absenceRepository.findAll(pageable);
    }

}
