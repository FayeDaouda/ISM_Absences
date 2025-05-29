package sn.ism.gestion.web.dto.Response;


import sn.ism.gestion.data.entities.Admin;
import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
public class AdminSimpleResponse {
    
    private String utilisateurId ;
    private String nom;
    private String prenom;
    
    public AdminSimpleResponse(Admin admin) {

        this.utilisateurId = admin.getUtilisateurId();
        
    }

}
