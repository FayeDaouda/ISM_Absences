package sn.ism.gestion.mobile.dto.Request;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Vigile;

@Getter
@Setter
public class VigileSimpleRequest {

    private UtilisateurCreateRequest utilisateurcreate;

    public Vigile toVigile() {
        Vigile vigile = new Vigile();

        return vigile;
    }

}
