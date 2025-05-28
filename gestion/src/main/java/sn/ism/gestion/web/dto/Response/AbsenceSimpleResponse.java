package sn.ism.gestion.web.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.enums.Situation;

@Getter
@Setter
public class AbsenceSimpleResponse {

    private String etudiant;
    private String sessionId;
    private Situation type;
    private boolean justifiee;
    private String justificationId;

    public AbsenceSimpleResponse(Absence absence) {
        this.etudiant = absence.getEtudiantId();
        this.sessionId = absence.getSessionId();
        this.type = absence.getType();
        this.justifiee = absence.isJustifiee();
        this.justificationId = absence.getJustificationId();
    }
   

}
