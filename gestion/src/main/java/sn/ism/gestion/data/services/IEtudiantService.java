package sn.ism.gestion.data.services;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.web.dto.Request.EtudiantSimpleRequest;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;


public interface IEtudiantService extends Service<Etudiant>{

    EtudiantAllResponse getOne(String id);
    Etudiant createEtudiant(EtudiantSimpleRequest etudiantSimpleRequest) ;
    Etudiant getByMatricule(String matricule);
    Page<Absence> getMylistAbsencesPageable(String etudiantId, Pageable pageable);
    Absence justifierAbsence(String absenceId, Justification justificatif);
    Page<EtudiantAllResponse> getAllEtudiants(Pageable pageable);
    EtudiantAllResponse findByMat(String matricule);

    }


