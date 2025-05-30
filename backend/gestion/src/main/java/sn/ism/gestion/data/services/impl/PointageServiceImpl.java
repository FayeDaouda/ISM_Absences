package sn.ism.gestion.data.services.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import sn.ism.gestion.data.entities.Pointage;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.data.repositories.EtudiantRepository;
import sn.ism.gestion.data.repositories.PointageRepository;
import sn.ism.gestion.data.repositories.VigileRepository;
import sn.ism.gestion.data.services.IPointageService;

@Service
public class PointageServiceImpl implements IPointageService {

    @Autowired
    private PointageRepository pointageRepo;

    @Autowired
    private EtudiantRepository etudiantRepo;

    @Autowired
    private VigileRepository vigileRepo;

    @Override
    public Pointage create(Pointage object) {
        object.setDateHeure(LocalDateTime.now());
        return pointageRepo.save(object);
    }

    @Override
    public Pointage update(String id, Pointage object) {
        Pointage existing = pointageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Pointage non trouvé"));
        object.setId(existing.getId());
        return pointageRepo.save(object);
    }

    @Override
    public boolean delete(String id) {
        if (!pointageRepo.existsById(id)) return false;
        pointageRepo.deleteById(id);
        return true;
    }

    @Override
    public Pointage findById(String id) {
        return pointageRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Pointage non trouvé"));
    }

    @Override
    public List<Pointage> findAll() {
        return pointageRepo.findAll();
    }

    @Override
    public Page<Pointage> findAll(Pageable pageable) {
        return pointageRepo.findAll(pageable);
    }

    @Override
    public Pointage pointerQrCode(String etudiantId, String vigileId) {
        // Optionnel : valider que l'étudiant et le vigile existent
        Etudiant etu = etudiantRepo.findById(etudiantId)
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));
        Vigile vig = vigileRepo.findById(vigileId)
                .orElseThrow(() -> new RuntimeException("Vigile introuvable"));

        Pointage p = new Pointage();
        p.setEtudiantId(etu.getId());
        p.setVigileId(vig.getId());
        p.setDateHeure(LocalDateTime.now());
        return pointageRepo.save(p);
    }

    @Override
    public Pointage pointermanuellement(String matriculeEtudiant, String vigileId) {
        Etudiant etu = etudiantRepo.findByMatricule(matriculeEtudiant)
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));
        Vigile vig = vigileRepo.findById(vigileId)
                .orElseThrow(() -> new RuntimeException("Vigile introuvable"));

        Pointage p = new Pointage();
        p.setEtudiantId(etu.getId());
        p.setVigileId(vig.getId());
        p.setDateHeure(LocalDateTime.now());
        return pointageRepo.save(p);
    }

    @Override
    public Page<Pointage> findByEtudiant(String matricule, Pageable pageable) {
        Etudiant etu = etudiantRepo.findByMatricule(matricule)
                .orElseThrow(() -> new RuntimeException("Étudiant introuvable"));
        return pointageRepo.findByEtudiantId(etu.getId(), pageable);
    }
}
