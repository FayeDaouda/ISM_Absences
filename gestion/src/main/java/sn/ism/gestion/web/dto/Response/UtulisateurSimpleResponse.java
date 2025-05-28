package sn.ism.gestion.web.dto.Response;
import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.enums.Role;
@Getter
@Setter
public class UtulisateurSimpleResponse {
    
    private String login;
    private String motDePasse;
    private Role role;

    public UtulisateurSimpleResponse(Utilisateur utulisateur) {
      
        this.login = utulisateur.getLogin();
        this.motDePasse = utulisateur.getMotDePasse();
        this.role = utulisateur.getRole();
    }

}
