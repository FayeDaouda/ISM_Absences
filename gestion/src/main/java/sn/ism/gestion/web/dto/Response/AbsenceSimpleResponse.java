package sn.ism.gestion.web.dto.Response;

import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.enums.Situation;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AbsenceSimpleResponse {

    private String sessionId;
    private String classeEtudiant;
    private Situation type;
    private boolean justifiee;
    private String justificationId;// on doit avoi simple justifcation

}
