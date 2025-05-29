package sn.ism.gestion.web.dto.Response;
import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.enums.Role;
@Getter
@Setter
public class UtilisateurSimpleResponse {

    private String nom;
    private String prenom;
    private String login;
    private String motDePasse;
    private Role role;

    public UtilisateurSimpleResponse(Utilisateur utulisateur) {
        this.nom = utulisateur.getNom();
        this.prenom = utulisateur.getPrenom();
        this.login = utulisateur.getLogin();
        this.motDePasse = utulisateur.getMotDePasse();
        this.role = utulisateur.getRole();
    }

}
