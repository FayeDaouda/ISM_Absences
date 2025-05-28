package sn.ism.gestion.data.services;

import java.util.List;

import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.SessionCours;

public interface ISessionCoursServices extends Service<SessionCours> {
   
    List<SessionCours> getSessionsDuJour();

}
