package sn.ism.gestion.mobile.dto.Response;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AdminSimpleResponse {

    private String utilisateurId;

    private UtilisateurSimpleResponse utilisateur;


}
