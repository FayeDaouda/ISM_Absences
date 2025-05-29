package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.web.dto.Response.AbsenceEtudiantResponse;

@Mapper(componentModel = "spring")
public interface AbsenceMapper {

    AbsenceEtudiantResponse toDto(Absence absence);

}
