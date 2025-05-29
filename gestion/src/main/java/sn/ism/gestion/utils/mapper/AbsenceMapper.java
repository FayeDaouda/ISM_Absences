package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.web.dto.Response.AbsenceEtudiantResponse;
import sn.ism.gestion.web.dto.Response.AbsenceSimpleResponse;

@Mapper(componentModel = "spring")
public interface AbsenceMapper {

    AbsenceEtudiantResponse toDto(Absence absence);

}
