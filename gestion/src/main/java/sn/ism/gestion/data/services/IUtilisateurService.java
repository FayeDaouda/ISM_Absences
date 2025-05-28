package sn.ism.gestion.data.services;

import java.util.Optional;

import sn.ism.gestion.Config.Service;
import sn.ism.gestion.data.entities.Utilisateur;

public interface IUtilisateurService extends Service<Utilisateur> {
    
    Optional<Utilisateur> findByLogin(String login);

}