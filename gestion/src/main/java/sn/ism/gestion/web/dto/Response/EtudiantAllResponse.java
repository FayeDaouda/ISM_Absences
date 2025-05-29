package sn.ism.gestion.web.dto.Response;

import java.util.List;
import sn.ism.gestion.data.entities.Etudiant;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class EtudiantAllResponse {

    private String nom;
    private String prenom;
    private String login;
    private String utilisateurId;

    private List<AbsenceSimpleResponse> listAbsences;

    public EtudiantAllResponse(Etudiant etudiant, List<AbsenceSimpleResponse> absences,String login) {
        this.login = login;
        this.utilisateurId = etudiant.getUtilisateurId();
        this.listAbsences = absences;
    }
}
