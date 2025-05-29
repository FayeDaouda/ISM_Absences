package sn.ism.gestion.data.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.enums.Role;
import sn.ism.gestion.data.repositories.AbsenceRepository;
import sn.ism.gestion.data.repositories.EtudiantRepository;
import sn.ism.gestion.data.repositories.UtilisateurRepository;
import sn.ism.gestion.data.services.IEtudiantService;
import sn.ism.gestion.utils.exceptions.EntityNotFoundExecption;
import sn.ism.gestion.utils.mapper.EtudiantMapper;
import sn.ism.gestion.utils.mapper.UtilisateurMapper;
import sn.ism.gestion.web.dto.Request.EtudiantSimpleRequest;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;


@Service
@RequiredArgsConstructor
public class EtudiantServiceImpl implements IEtudiantService {

    @Autowired
    private UtilisateurRepository utilisateurRepository;
    @Autowired
    private EtudiantRepository etudiantRepository;
    @Autowired
    private AbsenceRepository absenceRepository;
    @Autowired
    private UtilisateurMapper utilisateurMapper;
    @Autowired
    private EtudiantMapper etudiantMapper;
   

    public Etudiant createEtudiant(EtudiantSimpleRequest etudiantSimpleRequest) {
        var existingEtudiant = etudiantRepository.findByMatricule(etudiantSimpleRequest.getMatricule());
        if (existingEtudiant.isPresent()) {
            throw new EntityNotFoundExecption("Un étudiant avec ce matricule existe déjà");
        }
        Utilisateur utilisateur = utilisateurMapper.toEntity(etudiantSimpleRequest.getUtilisateurcreate());
        utilisateur.setRole(Role.ETUDIANT);
        utilisateur = utilisateurRepository.save(utilisateur);
        Etudiant etudiantCreate = etudiantMapper.toEntityR(etudiantSimpleRequest);
        etudiantCreate.setUtilisateurId(utilisateur.getId());
        return etudiantRepository.save(etudiantCreate);
       }

    @Override
    public Etudiant create(Etudiant object) {
        return null;
    }

    @Override
    public Etudiant update(String id, Etudiant object) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundExecption("Étudiant non trouvé"));
        etudiant.setMatricule(object.getMatricule());
        return etudiantRepository.save(etudiant);
    }

    @Override
    public boolean delete(String id) {
        Etudiant etudiant = etudiantRepository.findById(id)
                .orElse(null);
        if (etudiant != null) {
            etudiantRepository.delete(etudiant);
            return true;
        }
        return false;
    }

    @Override
    public Etudiant findById(String id) {
        return etudiantRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundExecption("Étudiant non trouvé"));
    }

    @Override
    public List<Etudiant> findAll() {
        return etudiantRepository.findAll();
    }

    @Override
    public Page<Etudiant> findAll(Pageable pageable) {
        return etudiantRepository.findAll(pageable);
    }

    @Override
    public Etudiant getByMatricule(String matricule) {
        return etudiantRepository.findByMatricule(matricule)
                .orElseThrow(() -> new EntityNotFoundExecption("Étudiant avec ce matricule non trouvé"));
    }

    @Override
    public Absence justifierAbsence(String absenceId, Justification justificatif) {
        Absence absence = absenceRepository.findById(absenceId)
                .orElseThrow(() -> new EntityNotFoundExecption("Absence non trouvée"));
        absence.setJustificationId(justificatif.getId());
        absence.setJustifiee(true);
        return absenceRepository.save(absence);
    }

    @Override
    public Page<Absence> getMylistAbsencesPageable(String etudiantId, Pageable pageable) {
        return absenceRepository.findByEtudiantId(etudiantId, pageable);
    }
    @Override
    public Page<EtudiantAllResponse> getAllEtudiants(Pageable pageable) {
        Page<Etudiant> etudiants = etudiantRepository.findAll(pageable);

        return etudiants.map(e -> {
            EtudiantAllResponse dto = new EtudiantAllResponse();
            dto.setMatricule(e.getMatricule());
            dto.setTelephone(e.getTelephone());

            utilisateurRepository.findById(e.getUtilisateurId()).ifPresent(u -> {
                dto.setUtilisateurId(u.getId());
                dto.setLogin(u.getLogin());
                dto.setNom(u.getNom());
                dto.setPrenom(u.getPrenom());
            });

            return dto;
        });
    }

     @Override
     public EtudiantAllResponse getOne(String id) {
         Etudiant etudiant = etudiantRepository.findById(id)
                 .orElseThrow(() -> new RuntimeException("Aucun Etudiant trouvé"));

         Utilisateur utilisateur = utilisateurRepository.findById(etudiant.getUtilisateurId())
                 .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

         EtudiantAllResponse dto = new EtudiantAllResponse();
         dto.setId(etudiant.getId());
         dto.setMatricule(etudiant.getMatricule());
         dto.setTelephone(etudiant.getTelephone());
         dto.setUtilisateurId(utilisateur.getId());
         dto.setLogin(utilisateur.getLogin());
         dto.setNom(utilisateur.getNom());
         dto.setPrenom(utilisateur.getPrenom());

         return dto;
     }


    @Override
    public EtudiantAllResponse findByMat(String matricule) {
        Etudiant etudiant = etudiantRepository.findByMatricule(matricule)
                .orElseThrow(() -> new RuntimeException("Aucun Etudiant trouvé"));

        Utilisateur utilisateur = utilisateurRepository.findById(etudiant.getUtilisateurId())
                .orElseThrow(() -> new RuntimeException("Utilisateur introuvable"));

        EtudiantAllResponse dto = new EtudiantAllResponse();
        dto.setId(etudiant.getId());
        dto.setMatricule(etudiant.getMatricule());
        dto.setTelephone(etudiant.getTelephone());

        dto.setUtilisateurId(utilisateur.getId());
        dto.setLogin(utilisateur.getLogin());
        dto.setNom(utilisateur.getNom());
        dto.setPrenom(utilisateur.getPrenom());

        return dto;
    }
}
