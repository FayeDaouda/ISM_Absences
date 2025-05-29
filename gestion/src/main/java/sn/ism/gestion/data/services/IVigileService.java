package sn.ism.gestion.data.services;


import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.data.entities.Pointage;
import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.web.dto.Request.AdminSimpleRequest;
import sn.ism.gestion.web.dto.Request.VigileSimpleRequest;

public interface IVigileService extends Service<Vigile> {

     Vigile createVigile(VigileSimpleRequest vigileSimpleRequest) ;

        Pointage pointerEtudiant(String matricule);

}
