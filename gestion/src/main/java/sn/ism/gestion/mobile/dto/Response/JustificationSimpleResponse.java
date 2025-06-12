package sn.ism.gestion.mobile.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.enums.StatutJustification;

import java.time.LocalDateTime;

@Getter
@Setter
public class JustificationSimpleResponse {
    
    private String absenceId;
    private String commentaire;
    private String fichierUrl;
    private StatutJustification statut;
    private LocalDateTime dateSoumission;

}
