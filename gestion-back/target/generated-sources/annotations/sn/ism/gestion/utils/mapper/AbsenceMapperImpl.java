package sn.ism.gestion.utils.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.enums.Situation;
import sn.ism.gestion.web.dto.Request.AbsenceRequest;
import sn.ism.gestion.web.dto.Response.AbsenceAllResponse;
import sn.ism.gestion.web.dto.Response.AbsenceSimpleResponse;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-12T22:35:02+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class AbsenceMapperImpl implements AbsenceMapper {

    @Override
    public AbsenceAllResponse toDto(AbsenceAllResponse absence) {
        if ( absence == null ) {
            return null;
        }

        AbsenceAllResponse absenceAllResponse = new AbsenceAllResponse();

        absenceAllResponse.setId( absence.getId() );
        absenceAllResponse.setNonEtudiant( absence.getNonEtudiant() );
        absenceAllResponse.setPrenomEtudiant( absence.getPrenomEtudiant() );
        absenceAllResponse.setClasseEtudiant( absence.getClasseEtudiant() );
        absenceAllResponse.setSessionId( absence.getSessionId() );
        absenceAllResponse.setType( absence.getType() );
        absenceAllResponse.setJustifiee( absence.isJustifiee() );

        return absenceAllResponse;
    }

    @Override
    public AbsenceSimpleResponse toDtoAll(AbsenceSimpleResponse etudiant) {
        if ( etudiant == null ) {
            return null;
        }

        AbsenceSimpleResponse absenceSimpleResponse = new AbsenceSimpleResponse();

        absenceSimpleResponse.setSessionId( etudiant.getSessionId() );
        absenceSimpleResponse.setSessionHeure( etudiant.getSessionHeure() );
        absenceSimpleResponse.setSessionDate( etudiant.getSessionDate() );
        absenceSimpleResponse.setSessionHeureFin( etudiant.getSessionHeureFin() );
        absenceSimpleResponse.setClasseEtudiant( etudiant.getClasseEtudiant() );
        absenceSimpleResponse.setType( etudiant.getType() );
        absenceSimpleResponse.setJustifiee( etudiant.isJustifiee() );
        absenceSimpleResponse.setJustificationId( etudiant.getJustificationId() );
        absenceSimpleResponse.setHeurePointage( etudiant.getHeurePointage() );

        return absenceSimpleResponse;
    }

    @Override
    public Absence toEntity(Absence request) {
        if ( request == null ) {
            return null;
        }

        Absence absence = new Absence();

        absence.setId( request.getId() );
        absence.setCreatedAt( request.getCreatedAt() );
        absence.setUpdatedAt( request.getUpdatedAt() );
        absence.setEtudiantId( request.getEtudiantId() );
        absence.setSessionId( request.getSessionId() );
        absence.setType( request.getType() );
        absence.setJustifiee( request.isJustifiee() );
        absence.setJustificationId( request.getJustificationId() );
        absence.setHeurePointage( request.getHeurePointage() );
        absence.setDate( request.getDate() );

        return absence;
    }

    @Override
    public Absence toEntityR(AbsenceRequest request) {
        if ( request == null ) {
            return null;
        }

        Absence absence = new Absence();

        absence.setEtudiantId( request.getEtudiantId() );
        absence.setSessionId( request.getSessionId() );
        if ( request.getType() != null ) {
            absence.setType( Enum.valueOf( Situation.class, request.getType() ) );
        }
        absence.setJustifiee( request.isJustifiee() );
        absence.setDate( request.getDate() );

        return absence;
    }
}
