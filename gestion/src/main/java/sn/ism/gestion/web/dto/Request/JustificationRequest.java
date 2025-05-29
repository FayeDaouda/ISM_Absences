package sn.ism.gestion.web.dto.Request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.enums.StatutJustification;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JustificationRequest {

    @NotBlank(message = "L'identifiant de l'absence est requis")
    private String absenceId;

    @NotBlank(message = "Le commentaire est requis")
    private String commentaire;

    private String fichierUrl;

    @NotBlank(message = "Le statut est requis")
    private String statut; // Enum: StatutJustification

    @NotNull(message = "La date de soumission est requise")
    private LocalDateTime dateSoumission;

    public Justification toEntity() {
        Justification justification = new Justification();
        justification.setAbsenceId(this.absenceId);
        justification.setCommentaire(this.commentaire);
        justification.setFichierUrl(this.fichierUrl);
        justification.setStatut(StatutJustification.valueOf(this.statut)); // attention à la casse
        justification.setDateSoumission(this.dateSoumission);
        return justification;
    }
}