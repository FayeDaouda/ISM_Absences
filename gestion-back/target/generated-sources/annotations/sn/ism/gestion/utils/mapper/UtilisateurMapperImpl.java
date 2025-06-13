package sn.ism.gestion.utils.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.enums.Role;
import sn.ism.gestion.web.dto.Request.UtilisateurCreateRequest;
import sn.ism.gestion.web.dto.Response.UtilisateurSimpleResponse;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-12T22:35:01+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class UtilisateurMapperImpl implements UtilisateurMapper {

    @Override
    public Utilisateur toEntity(UtilisateurCreateRequest request) {
        if ( request == null ) {
            return null;
        }

        Utilisateur utilisateur = new Utilisateur();

        utilisateur.setNom( request.getNom() );
        utilisateur.setPrenom( request.getPrenom() );
        utilisateur.setLogin( request.getLogin() );
        utilisateur.setMotDePasse( request.getMotDePasse() );
        utilisateur.setPhoto( request.getPhoto() );
        if ( request.getRole() != null ) {
            utilisateur.setRole( Enum.valueOf( Role.class, request.getRole() ) );
        }

        return utilisateur;
    }

    @Override
    public UtilisateurSimpleResponse toDto(Utilisateur user) {
        if ( user == null ) {
            return null;
        }

        UtilisateurSimpleResponse utilisateurSimpleResponse = new UtilisateurSimpleResponse();

        utilisateurSimpleResponse.setId( user.getId() );
        utilisateurSimpleResponse.setNom( user.getNom() );
        utilisateurSimpleResponse.setPrenom( user.getPrenom() );
        utilisateurSimpleResponse.setLogin( user.getLogin() );
        utilisateurSimpleResponse.setPhoto( user.getPhoto() );
        utilisateurSimpleResponse.setRole( user.getRole() );

        return utilisateurSimpleResponse;
    }
}
