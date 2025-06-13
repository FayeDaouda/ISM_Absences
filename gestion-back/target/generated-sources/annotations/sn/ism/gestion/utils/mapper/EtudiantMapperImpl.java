package sn.ism.gestion.utils.mapper;

import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.web.dto.Request.EtudiantSimpleRequest;
import sn.ism.gestion.web.dto.Response.AbsenceAllResponse;
import sn.ism.gestion.web.dto.Response.AbsenceSimpleResponse;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;
import sn.ism.gestion.web.dto.Response.EtudiantSimpleResponse;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-12T22:35:01+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class EtudiantMapperImpl implements EtudiantMapper {

    @Override
    public EtudiantAllResponse toDtoListeAbsence(Etudiant etudiant, List<AbsenceSimpleResponse> absences, String login) {
        if ( etudiant == null && absences == null && login == null ) {
            return null;
        }

        EtudiantAllResponse etudiantAllResponse = new EtudiantAllResponse();

        if ( etudiant != null ) {
            etudiantAllResponse.setId( etudiant.getId() );
            etudiantAllResponse.setMatricule( etudiant.getMatricule() );
            etudiantAllResponse.setTelephone( etudiant.getTelephone() );
        }

        return etudiantAllResponse;
    }

    @Override
    public EtudiantAllResponse toDto(EtudiantAllResponse etudiant) {
        if ( etudiant == null ) {
            return null;
        }

        EtudiantAllResponse etudiantAllResponse = new EtudiantAllResponse();

        etudiantAllResponse.setId( etudiant.getId() );
        etudiantAllResponse.setNom( etudiant.getNom() );
        etudiantAllResponse.setPrenom( etudiant.getPrenom() );
        etudiantAllResponse.setClasse( etudiant.getClasse() );
        etudiantAllResponse.setMatricule( etudiant.getMatricule() );
        etudiantAllResponse.setTelephone( etudiant.getTelephone() );

        return etudiantAllResponse;
    }

    @Override
    public EtudiantSimpleResponse toDtoAll(EtudiantSimpleResponse etudiant) {
        if ( etudiant == null ) {
            return null;
        }

        EtudiantSimpleResponse etudiantSimpleResponse = new EtudiantSimpleResponse();

        etudiantSimpleResponse.setId( etudiant.getId() );
        etudiantSimpleResponse.setNom( etudiant.getNom() );
        etudiantSimpleResponse.setPrenom( etudiant.getPrenom() );
        etudiantSimpleResponse.setClasse( etudiant.getClasse() );
        etudiantSimpleResponse.setMatricule( etudiant.getMatricule() );
        etudiantSimpleResponse.setTelephone( etudiant.getTelephone() );
        List<AbsenceAllResponse> list = etudiant.getAbsences();
        if ( list != null ) {
            etudiantSimpleResponse.setAbsences( new ArrayList<AbsenceAllResponse>( list ) );
        }

        return etudiantSimpleResponse;
    }

    @Override
    public Etudiant toEntity(Etudiant request) {
        if ( request == null ) {
            return null;
        }

        Etudiant etudiant = new Etudiant();

        etudiant.setId( request.getId() );
        etudiant.setCreatedAt( request.getCreatedAt() );
        etudiant.setUpdatedAt( request.getUpdatedAt() );
        etudiant.setMatricule( request.getMatricule() );
        etudiant.setUtilisateurId( request.getUtilisateurId() );
        etudiant.setTelephone( request.getTelephone() );
        etudiant.setClasseId( request.getClasseId() );
        List<String> list = request.getAbsenceIds();
        if ( list != null ) {
            etudiant.setAbsenceIds( new ArrayList<String>( list ) );
        }

        return etudiant;
    }

    @Override
    public Etudiant toEntityR(EtudiantSimpleRequest request) {
        if ( request == null ) {
            return null;
        }

        Etudiant etudiant = new Etudiant();

        etudiant.setMatricule( request.getMatricule() );
        etudiant.setTelephone( request.getTelephone() );

        return etudiant;
    }
}
