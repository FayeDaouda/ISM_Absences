package sn.ism.gestion.data.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Pointage;

public interface IPointageService extends Service<Pointage> {

    Pointage pointerQrCode(String etudiantId,String vigileId);
    Pointage pointermanuellement(String matriculeEtudiant,String vigileId);
    Page<Pointage> findByEtudiant(String matricule,Pageable pageable);
    
}
