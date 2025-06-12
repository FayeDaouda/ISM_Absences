package sn.ism.gestion.data.services.impl;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.data.repositories.VigileRepository;
import sn.ism.gestion.data.services.IVigileService;

@Service
@RequiredArgsConstructor
public class VigileServiceImpl implements IVigileService {

    @Autowired
    private VigileRepository vigileRepository;

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

}
