package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;

@Mapper(componentModel = "spring")
public interface JustificationMapper {

    Justification toEntity(Justification request);

    Justification toEntityR(JustificationRequest request);

}
