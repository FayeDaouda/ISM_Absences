package sn.ism.gestion.data.services.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.repositories.UtilisateurRepository;
import sn.ism.gestion.data.services.IUtilisateurService;

@Service
public class UtilisateurServiceImpl implements IUtilisateurService {

    @Autowired
    private UtilisateurRepository utilisateurRepo;

    @Override
    public Utilisateur create(Utilisateur object) {
        return utilisateurRepo.save(object);
    }

    @Override
    public Utilisateur update(String id, Utilisateur object) {
        Utilisateur existing = utilisateurRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
        object.setId(existing.getId());
        return utilisateurRepo.save(object);
    }

    @Override
    public boolean delete(String id) {
        if (!utilisateurRepo.existsById(id)) return false;
        utilisateurRepo.deleteById(id);
        return true;
    }

    @Override
    public Utilisateur findById(String id) {
        return utilisateurRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé"));
    }

    @Override
    public List<Utilisateur> findAll() {
        return utilisateurRepo.findAll();
    }

    @Override
    public Page<Utilisateur> findAll(Pageable pageable) {
        return utilisateurRepo.findAll(pageable);
    }

    @Override
    public Utilisateur findByLogin(String login) {
        return utilisateurRepo.findByLogin(login)
                .orElseThrow(() -> new RuntimeException("Utilisateur non trouvé avec le login : " + login));
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Utilisateur utilisateur = utilisateurRepo.findByLogin(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utilisateur non trouvé avec le login : " + username));

        return User.withUsername(utilisateur.getLogin())
                .password(utilisateur.getMotDePasse())
                .roles(utilisateur.getRole().name())
                .build();
    }
}
