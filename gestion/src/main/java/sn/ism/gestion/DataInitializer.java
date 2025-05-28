package sn.ism.gestion;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.repositories.EtudiantRepository;

import java.util.List;

@Component
public class DataInitializer {

    @Autowired
    private EtudiantRepository etudiantRepository;

    @PostConstruct
    public void init() {
        // Supprimer les anciens (facultatif)
        etudiantRepository.deleteAll();

        // Créer un étudiant
        Etudiant etu = new Etudiant();
        etu.setNom("Fall");
        etu.setPrenom("Awa");
        etu.setEmail("awa.fall@exemple.com");
        etu.setUtilisateurId("u001");
        etu.setAbsenceIds(List.of("a001", "a002"));

        etudiantRepository.save(etu);

        System.out.println("Etudiant inséré !");
    }
}
