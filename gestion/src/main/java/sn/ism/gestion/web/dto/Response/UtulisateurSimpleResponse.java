package sn.ism.gestion.web.dto.Response;
import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.enums.Role;
@Getter
@Setter
public class UtulisateurSimpleResponse {
    
    private String nom;
    private String prenom;
    private String email;
    private String motDePasse;
    private Role role;

    public UtulisateurSimpleResponse(Utilisateur utulisateur) {
        this.nom = utulisateur.getNom();
        this.prenom = utulisateur.getPrenom();
        this.email = utulisateur.getEmail();
        this.motDePasse = utulisateur.getMotDePasse();
        this.role = utulisateur.getRole();
    }

}
