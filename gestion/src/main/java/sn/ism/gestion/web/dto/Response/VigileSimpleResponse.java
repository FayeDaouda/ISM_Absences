package sn.ism.gestion.web.dto.Response;
import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Vigile;
@Getter
@Setter
public class VigileSimpleResponse {
    
    private String utilisateurId ;

    public VigileSimpleResponse(Vigile vigile) {

        this.utilisateurId = vigile.getUtilisateurId();
        
    }

}
