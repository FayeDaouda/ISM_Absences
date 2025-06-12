package sn.ism.gestion.mobile.dto.Request;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.entities.Admin;

@Getter
@Setter
public class AdminSimpleRequest {

    private UtilisateurCreateRequest utilisateurcreate;

    public Admin toAdmin() {
        Admin admin = new Admin();

        return admin;
    }
}
