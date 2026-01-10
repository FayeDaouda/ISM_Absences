package sn.ism.gestion.data.services;

import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;
import sn.ism.gestion.web.dto.Request.JustificationTraitementRequest;

public interface IJustificationService extends Service<Justification> {
    Justification createJustication(JustificationRequest justificationRequest);
    Justification traiterJustication(String absenceId , JustificationTraitementRequest justificationRequest);

}
