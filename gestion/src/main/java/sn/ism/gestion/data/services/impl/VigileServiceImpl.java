package sn.ism.gestion.data.services.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import sn.ism.gestion.data.entities.Pointage;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.data.repositories.UtilisateurRepository;
import sn.ism.gestion.data.repositories.VigileRepository;
import sn.ism.gestion.data.services.IVigileService;
import sn.ism.gestion.web.dto.Response.VigileSimpleResponse;

@Service
public class VigileServiceImpl implements IVigileService {

    @Autowired
    private VigileRepository vigileRepository;

    @Autowired
    private UtilisateurRepository utilisateurRepository;

    @Override
    public Vigile create(Vigile vigile) {
        return vigileRepository.save(vigile);
    }

    @Override
    public Vigile update(String id, Vigile vigile) {
        Optional<Vigile> existingVigileOpt = vigileRepository.findById(id);
        if (existingVigileOpt.isPresent()) {
            Vigile existingVigile = existingVigileOpt.get();
            existingVigile.setUtilisateurId(vigile.getUtilisateurId());
            return vigileRepository.save(existingVigile);
        } else {
            throw new RuntimeException("Vigile avec l'id " + id + " non trouvé");
        }
    }

    @Override
    public boolean delete(String id) {
        if (vigileRepository.existsById(id)) {
            vigileRepository.deleteById(id);
            return true;
        }
        return false;
    }

    @Override
    public Vigile findById(String id) {
        return vigileRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vigile avec l'id " + id + " non trouvé"));
    }

    @Override
    public List<Vigile> findAll() {
        return vigileRepository.findAll();
    }

    @Override
    public Page<Vigile> findAll(Pageable pageable) {
        return vigileRepository.findAll(pageable);
    }

    // Exemple fictif (tu peux modifier selon ta logique)
    @Override
    public Pointage pointerEtudiant(String matricule) {
        throw new UnsupportedOperationException("Méthode pointerEtudiant non implémentée");
    }

    public VigileSimpleResponse getVigileResponse(Vigile vigile) {
        Utilisateur utilisateur = utilisateurRepository.findById(vigile.getUtilisateurId())
            .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));

        return new VigileSimpleResponse(vigile, utilisateur.getLogin());
    }
    
}
