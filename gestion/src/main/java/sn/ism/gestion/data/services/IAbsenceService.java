package sn.ism.gestion.data.services;

import java.util.List;

import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Absence;

public interface IAbsenceService extends Service<Absence> {
    
    List<Absence> findAbsencesByEtudiant(String matricule);
    
}
