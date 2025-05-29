package sn.ism.gestion.web.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.enums.Situation;

@Getter
@Setter
public class AbsenceEtudiantResponse {

    private String etudiantId;
    private String sessionId;
    private Situation type;
    private boolean justifiee;
    private String justificationId;

    public AbsenceEtudiantResponse(Absence absence) {
        this.etudiantId = absence.getEtudiantId();
        this.sessionId = absence.getSessionId();
        this.type = absence.getType();
        this.justifiee = absence.isJustifiee();
        this.justificationId = absence.getJustificationId();
    }
   

}
