package sn.ism.gestion.mobile.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.enums.Situation;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class AbsenceSimpleResponse {

    private String sessionId;
    private LocalDateTime sessionHeure;
    private LocalDate sessionDate;
    private LocalDateTime sessionHeureFin;
    private String classeEtudiant;
    private Situation type;
    private boolean justifiee;
    private String justificationId;
    private String heurePointage;

}
