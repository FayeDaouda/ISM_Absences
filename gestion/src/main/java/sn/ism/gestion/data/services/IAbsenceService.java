package sn.ism.gestion.data.services;

import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Absence;

public interface IAbsenceService extends Service<Absence> {
    Absence pointerEtudiantByMatricule(String sessionId, String matricule);
    Absence pointerEtudiant(String sessionId, String etudiantId);

}
