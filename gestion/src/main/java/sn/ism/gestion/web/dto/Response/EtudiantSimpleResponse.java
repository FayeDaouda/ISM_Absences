package sn.ism.gestion.web.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Etudiant;

@Getter
@Setter
public class EtudiantSimpleResponse {


    private String login;
    private String utilisateurId;

    // public EtudiantSimpleResponse(Etudiant etudiant,String login) {
    //     this.nom = etudiant.getNom();
    //     this.prenom = etudiant.getPrenom();
    //     this.login = login;
    //     this.utilisateurId = etudiant.getUtilisateurId();
    // }
    public EtudiantSimpleResponse(Etudiant etudiant) {
        if (etudiant == null) {
            throw new IllegalArgumentException("Etudiant ne peut pas être null");
        }
        this.utilisateurId = etudiant.getUtilisateurId();
    }

}
