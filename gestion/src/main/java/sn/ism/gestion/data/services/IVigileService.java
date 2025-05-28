package sn.ism.gestion.data.services;


import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Pointage;
import sn.ism.gestion.data.entities.Vigile;

public interface IVigileService extends Service<Vigile> {
   
    Pointage pointerEtudiant(String matricule);

}
