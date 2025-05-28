package sn.ism.gestion.web.dto.Response;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.enums.Situation;
@Getter
@Setter
public class AbsenceAllResponse {
    
    private String etudiant;
    private String sessionId;
    private Situation type;
    private boolean justifiee;
    private String justificationId;
    List<Justification> justificationSimpleResponse;

     public AbsenceAllResponse(Absence absence) {
        this.etudiant = absence.getEtudiantId();
        this.sessionId = absence.getSessionId();
        this.type = absence.getType();
        this.justifiee = absence.isJustifiee();
        this.justificationId = absence.getJustificationId();
    }
    public void setEtudiantFullName(String nom, String prenom) {
        this.etudiant = prenom + " " + nom;
    }
}
