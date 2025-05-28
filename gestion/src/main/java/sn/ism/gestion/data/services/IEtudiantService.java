package sn.ism.gestion.data.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;

public interface IEtudiantService extends Service<Etudiant>{
   
    Etudiant getByMatricule(String matricule);
    Page<Absence> getMylistAbsences(String etudiantId, Pageable pageable);
    Absence justifierAbsence(String absenceId, String justificatif);
   
}


