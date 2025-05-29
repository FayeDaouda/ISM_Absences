package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.web.dto.Request.JustificationRequest;
import sn.ism.gestion.web.dto.Request.UtilisateurCreateRequest;
import sn.ism.gestion.web.dto.Response.JustificationSimpleResponse;
import sn.ism.gestion.web.dto.Response.UtilisateurSimpleResponse;

import java.util.Optional;

@Mapper(componentModel = "spring")
public interface JustificationMapper {

    JustificationSimpleResponse toDto(Justification Justification);


    // Conversion requête vers entité
    Justification toEntity(JustificationRequest request);

}
