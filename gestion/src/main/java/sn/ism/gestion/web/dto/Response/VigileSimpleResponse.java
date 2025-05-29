package sn.ism.gestion.web.dto.Response;
import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Vigile;
@Getter
@Setter
public class VigileSimpleResponse {
    
    private String nom;
    private String prenom;
    private String login;

    public VigileSimpleResponse(Vigile vigile, String login) {

        this.login = login;
    }
}

