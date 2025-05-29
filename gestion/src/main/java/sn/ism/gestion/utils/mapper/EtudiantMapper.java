package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Named;
import java.util.List;

import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.web.dto.Request.EtudiantSimpleRequest;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;
import sn.ism.gestion.web.dto.Response.EtudiantSimpleResponse;
import sn.ism.gestion.web.dto.Response.AbsenceEtudiantResponse;

@Mapper(componentModel = "spring", uses = AbsenceMapper.class)
public interface EtudiantMapper {

    EtudiantAllResponse toDtoListeAbsence(Etudiant etudiant, List<AbsenceEtudiantResponse> absences, String login);

    EtudiantSimpleResponse toDto(Etudiant etudiant);

    EtudiantAllResponse toDtoAll(EtudiantAllResponse etudiant);

    Etudiant toEntity(Etudiant request);

    Etudiant toEntityR(EtudiantSimpleRequest request);

    @Named("mapAbsenceIdsToResponses")
    default List<AbsenceEtudiantResponse> mapAbsenceIdsToResponses(List<String> absenceIds) {
        throw new UnsupportedOperationException(
            "Le mapping des absences à partir des IDs doit être effectué dans le service");
    }
}
