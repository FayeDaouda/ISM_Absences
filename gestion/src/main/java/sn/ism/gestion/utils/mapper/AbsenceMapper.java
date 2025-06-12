package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Absence;

@Mapper(componentModel = "spring")
public interface AbsenceMapper {

    Absence toEntity(Absence request);

}
