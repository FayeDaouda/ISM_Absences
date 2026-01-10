package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;
import sn.ism.gestion.web.dto.Response.JustificationSimpleResponse;

@Mapper(componentModel = "spring")
public interface JustificationMapper {

    JustificationSimpleResponse toDto(Justification Justification);

    Justification toEntity(Justification request);

    Justification toEntityR(JustificationRequest request);

}
