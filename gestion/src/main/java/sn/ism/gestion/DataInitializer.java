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
        etudiantRepository.deleteAll();

        Etudiant etu = new Etudiant();
        etu.setId("6837bbc8608b37000cb3f82d"); // FORCÉ L’ID
        etu.setMatricule("ET1234");
        etu.setUtilisateurId("u001");
        etu.setTelephone("777123456");
        etu.setAbsenceIds(List.of("a001", "a002"));

        etudiantRepository.save(etu);

        System.out.println("Etudiant inséré !");
    }
}