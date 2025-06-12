package sn.ism.gestion.data.services.impl;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.enums.Situation;
import sn.ism.gestion.data.repositories.*;
import sn.ism.gestion.data.repositories.EtudiantRepository;
import sn.ism.gestion.data.repositories.AbsenceRepository;
import sn.ism.gestion.data.services.IAbsenceService;
import sn.ism.gestion.utils.exceptions.EntityNotFoundExecption;

@Service
public class AbsenceServiceImpl implements IAbsenceService {
    @Autowired
    private AbsenceRepository absenceRepository;

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private SessionsCoursRepository sessionCoursRepository;

    @Override
    public Absence create(Absence object) {
        return absenceRepository.save(object);
    }

    public Absence pointerEtudiantByMatricule(String sessionId, String matricule) {
        Absence absence = absenceRepository.findOneBySessionIdAndEtudiantId(sessionId, matricule)
                .orElseGet(() -> {
                    sessionCoursRepository.findById(sessionId)
                            .orElseThrow(() -> new EntityNotFoundExecption("Session introuvable"));
                    var etu = etudiantRepository.findByMatricule(matricule)
                            .orElseThrow(() -> new EntityNotFoundExecption("Étudiant introuvable"));

                    Absence newAbsence = new Absence();
                    newAbsence.setSessionId(sessionId);
                    newAbsence.setEtudiantId(etu.getId());
                    newAbsence.setJustifiee(false);
                    return absenceRepository.save(newAbsence);
                });

        LocalDateTime heureDebut = sessionCoursRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundExecption("Session introuvable"))
                .getHeureDebut();

        LocalDateTime heureActuelle = LocalDateTime.now();

        if (heureActuelle.isBefore(heureDebut.plusMinutes(5))) {
            absence.setType(Situation.PRESENT);
        } else {
            absence.setType(Situation.RETARD);
        }

        absence.setHeurePointage(LocalTime.now());
        return absenceRepository.save(absence);
    }

    public Absence pointerEtudiant(String sessionId, String etudiantId) {
        Absence absence = absenceRepository.findOneBySessionIdAndEtudiantId(sessionId, etudiantId)
                .orElseGet(() -> {
                    sessionCoursRepository.findById(sessionId)
                            .orElseThrow(() -> new EntityNotFoundExecption("Session introuvable"));
                    etudiantRepository.findById(etudiantId)
                            .orElseThrow(() -> new EntityNotFoundExecption("Étudiant introuvable"));
                    Absence newAbsence = new Absence();
                    newAbsence.setSessionId(sessionId);
                    newAbsence.setEtudiantId(etudiantId);
                    newAbsence.setJustifiee(false);
                    return absenceRepository.save(newAbsence);
                });

        LocalDateTime heureDebut = sessionCoursRepository.findById(sessionId)
                .orElseThrow(() -> new EntityNotFoundExecption("Session introuvable"))
                .getHeureDebut();

        LocalDateTime heureActuelle = LocalDateTime.now();

        if (heureActuelle.isBefore(heureDebut.plusMinutes(5))) {
            absence.setType(Situation.PRESENT);
        } else {
            absence.setType(Situation.RETARD);
        }

        absence.setHeurePointage(LocalTime.now());
        return absenceRepository.save(absence);
    }

    @Override
    public Absence update(String id, Absence absence) {
        Absence existing = absenceRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Absence non trouvée avec ID : " + id));
        absence.setId(existing.getId());
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