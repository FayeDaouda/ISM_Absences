package sn.ism.gestion.web.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Etudiant;

@Getter
@Setter
public class EtudiantSimpleResponse {

    private String nom;
    private String prenom;
    private String email;
    private String utilisateurId;

    public EtudiantSimpleResponse(Etudiant etudiant) {
        this.nom = etudiant.getNom();
        this.prenom = etudiant.getPrenom();
        this.email = etudiant.getEmail();
        this.utilisateurId = etudiant.getUtilisateurId();
    }

}
