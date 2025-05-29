package sn.ism.gestion.web.dto.Response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EtudiantSimpleResponse {

    private UtilisateurSimpleResponse utilisateur;
    private String id;
    private String utulisateurId;
    private String matricule;
    private String telephone;
    List<String> absenceIds ;
//
//    public EtudiantSimpleResponse(Etudiant etudiant) {
//        if (etudiant == null) {
//            throw new IllegalArgumentException("Etudiant ne peut pas être null");
//        }
//        Utilisateur utilisateur = new Utilisateur();
//        this.utilisateur = new UtilisateurSimpleResponse(utilisateur);
//        this.matricule = etudiant.getMatricule();
//        this.telephone = etudiant.getTelephone();
//        this.absenceIds = etudiant.getAbsenceIds().stream()
//                .filter(absenceId -> absenceId != null && !absenceId.isEmpty())
//                .toList();
//
//    }

}