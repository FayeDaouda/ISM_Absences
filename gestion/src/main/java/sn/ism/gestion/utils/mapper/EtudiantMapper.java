package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import java.util.List;

import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.web.dto.Request.EtudiantSimpleRequest;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;
import sn.ism.gestion.web.dto.Response.EtudiantSimpleResponse;
import sn.ism.gestion.web.dto.Response.AbsenceEtudiantResponse;

@Mapper(componentModel = "spring", uses = AbsenceMapper.class)
public interface EtudiantMapper {

    // On mappe la liste d'absences déjà récupérée vers listAbsences dans le DTO
    //@Mapping(target = "listAbsences", source = "absences")
    EtudiantAllResponse toDtoListeAbsence(Etudiant etudiant, List<AbsenceEtudiantResponse> absences, String login);
    //EtudiantAllResponse toDtoListeAbsence(Etudiant etudiant, List<AbsenceSimpleResponse> absences);

    // Transformation simple sans les absences
    EtudiantSimpleResponse toDto(Etudiant etudiant);

    // Conversion requête vers entité
    Etudiant toEntity(EtudiantSimpleRequest request);

    // Cette méthode doit être gérée en dehors de MapStruct (dans ton service)
    @Named("mapAbsenceIdsToResponses")
    default List<AbsenceEtudiantResponse> mapAbsenceIdsToResponses(List<String> absenceIds) {
        throw new UnsupportedOperationException(
            "Le mapping des absences à partir des IDs doit être effectué dans le service");
    }
}
