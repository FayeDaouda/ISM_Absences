package sn.ism.gestion.data.services;

import java.time.LocalDateTime;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.SessionCours;

public interface ISessionCoursService extends Service<SessionCours> {
       
    Page<SessionCours> getSessionsDuJour(LocalDateTime dateHeure, Pageable pageable) ;

}
