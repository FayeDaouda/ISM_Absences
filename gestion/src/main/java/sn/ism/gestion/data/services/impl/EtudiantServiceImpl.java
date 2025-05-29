package sn.ism.gestion.data.services.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.repositories.AbsenceRepository;
import sn.ism.gestion.data.repositories.EtudiantRepository;
import sn.ism.gestion.data.repositories.UtilisateurRepository;
import sn.ism.gestion.data.services.IEtudiantService;
import sn.ism.gestion.utils.exceptions.EntityNotFoundExecption;
import sn.ism.gestion.utils.mapper.AbsenceMapper;
import sn.ism.gestion.utils.mapper.EtudiantMapper;
import sn.ism.gestion.web.dto.Response.EtudiantAllResponse;
import sn.ism.gestion.web.dto.Response.EtudiantSimpleResponse;

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
    private AbsenceMapper absenceMapper;
    @Autowired
    private EtudiantMapper etudiantMapper;

    @Override
    public Etudiant create(Etudiant etudiant) {
        return etudiantRepository.save(etudiant);
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
    public Page<Absence> getMylistAbsences(String etudiantId, Pageable pageable) {
        return absenceRepository.findByEtudiantId(etudiantId, pageable);
    }

//     public EtudiantAllResponse getEtudiantWithAbsences(String id, Pageable pageable) {
//     Etudiant etudiant = etudiantRepository.findById(id)
//         .orElseThrow(() -> new EntityNotFoundExecption("Étudiant non trouvé"));

//     // Récupérer une page d'absences liées à l'étudiant
//     Page<Absence> absencesPage = absenceRepository.findByEtudiantId(etudiant.getId(), pageable);

//     // Mapper les absences vers DTO
//     List<AbsenceSimpleResponse> absenceDtos = absencesPage.getContent().stream()
//         .map(absenceMapper::toDto)
//         .collect(Collectors.toList());

//     EtudiantAllResponse response = etudiantMapper.toDtoListeAbsence(etudiant, absenceDtos);

//     return response;
// }

//     public EtudiantSimpleResponse getEtudiantResponse(Etudiant etudiant) {
//         Utilisateur utilisateur = utilisateurRepository.findById(etudiant.getUtilisateurId())
//             .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

//         return new EtudiantSimpleResponse(etudiant, utilisateur.getLogin());
//     }

}
