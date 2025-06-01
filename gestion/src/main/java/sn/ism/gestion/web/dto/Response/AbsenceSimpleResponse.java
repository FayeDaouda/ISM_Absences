package sn.ism.gestion.web.dto.Response;

import sn.ism.gestion.data.enums.Situation;
import lombok.Getter;
import lombok.Setter;

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
