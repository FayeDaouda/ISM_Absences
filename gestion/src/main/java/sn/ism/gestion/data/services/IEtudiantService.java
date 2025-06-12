package sn.ism.gestion.data.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;

public interface IEtudiantService extends Service<Etudiant>{
    Page<Absence> getAbsencesByEtudiantId(String etudiantId, Pageable pageable);
    Etudiant getByMatricule(String matricule);
    Absence justifierAbsence(String absenceId, JustificationRequest justificatif);

}


