package sn.ism.gestion.utils.mapper;

import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.web.dto.Request.VigileSimpleRequest;
import sn.ism.gestion.web.dto.Response.VigileSimpleResponse;

public interface VigileMapper {

    VigileSimpleResponse toDto(Vigile vigile);

    Vigile toEntity(Vigile request);

    Vigile toEntityR(VigileSimpleRequest request);
}
