package sn.ism.gestion.data.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Absence;


public interface IAbsenceService extends Service<Absence> {

    Page<Absence> findAbsencesByEtudiant(String matricule,Pageable pageable);

}
