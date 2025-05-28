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
    private String email;
    private String utilisateurId;
    private List<AbsenceSimpleResponse> absences;

    public EtudiantAllResponse(Etudiant etudiant) {
        this.nom = etudiant.getNom();
        this.prenom = etudiant.getPrenom();
        this.email = etudiant.getEmail();
        this.utilisateurId = etudiant.getUtilisateurId();
    }

    public EtudiantAllResponse(Etudiant etudiant, List<AbsenceSimpleResponse> absences) {
        this(etudiant); 
        this.absences = absences;
    }
}
