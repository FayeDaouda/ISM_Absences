package sn.ism.gestion.web.dto.Request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.enums.Situation;

import java.time.LocalDate;

@Data
@NoArgsConstructor
public class AbsenceRequest {

    @NotBlank(message = "L'identifiant de l'étudiant est requis")
    private String etudiantId;

    @NotBlank(message = "L'identifiant de la session est requis")
    private String sessionId;

    @NotBlank(message = "Le type d'absence est requis")
    private String type;

    private LocalDate date = LocalDate.now();

    private boolean justifiee;

    public Absence toEntity() {
        Absence absence = new Absence();
        absence.setEtudiantId(this.etudiantId);
        absence.setSessionId(this.sessionId);
        absence.setType(Situation.valueOf(this.type));
        absence.setJustifiee(this.justifiee);
        absence.setDate(this.date);
        return absence;
    }
}