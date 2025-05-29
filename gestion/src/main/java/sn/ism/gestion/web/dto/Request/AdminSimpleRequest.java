package sn.ism.gestion.web.dto.Request;

import sn.ism.gestion.data.entities.Etudiant;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSimpleRequest {

    @NotBlank(message = "Le matricule est requis")
    private String matricule;

    @NotBlank(message = "Le nom est requis")
    private String nom;

    @NotBlank(message = "Le prénom est requis")
    private String prenom;

    @Email(message = "Email invalide")
    private String email;

    private String utilisateurId;

    public Etudiant toEtudiant() {
       Etudiant etudiant = new Etudiant();
        etudiant.setMatricule(matricule);
        etudiant.setUtilisateurId(utilisateurId);
        return etudiant;
    }
}
