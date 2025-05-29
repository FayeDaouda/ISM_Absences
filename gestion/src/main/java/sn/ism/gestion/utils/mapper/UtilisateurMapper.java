package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.web.dto.Request.UtilisateurCreateRequest;
import sn.ism.gestion.web.dto.Response.UtilisateurSimpleResponse;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface UtilisateurMapper {


    UtilisateurSimpleResponse toDto(Optional<Utilisateur> utilisateur);


    // Conversion requête vers entité
    Utilisateur toEntity(UtilisateurCreateRequest request);

}
