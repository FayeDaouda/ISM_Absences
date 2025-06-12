package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Vigile;

@Mapper(componentModel = "spring")
public interface VigileMapper {

    Vigile toEntity(Vigile request);

}
