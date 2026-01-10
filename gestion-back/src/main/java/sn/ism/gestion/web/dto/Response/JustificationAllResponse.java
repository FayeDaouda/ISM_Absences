package sn.ism.gestion.web.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.enums.StatutJustification;

import java.time.LocalDateTime;

@Getter
@Setter
public class JustificationAllResponse {

    private String nomEtudiant;
    private String classeEtudiant;
    private String motif;
    private StatutJustification statut;

}
