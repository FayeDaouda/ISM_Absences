package sn.ism.gestion;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.*;
import sn.ism.gestion.data.enums.Role;
import sn.ism.gestion.data.enums.Situation;
import sn.ism.gestion.data.repositories.*;

import java.util.*;

@Component
public class DataInitializer {

    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private EtudiantRepository etudiantRepository;
    @Autowired private ClasseRepository classeRepository;
    @Autowired private FiliereRepository filiereRepository;
    @Autowired private VigileRepository vigileRepository;
    @Autowired private AbsenceRepository absenceRepository;

    @PostConstruct
    public void init() {
        // Clean DB
        utilisateurRepository.deleteAll();
        etudiantRepository.deleteAll();
        classeRepository.deleteAll();
        vigileRepository.deleteAll();
        absenceRepository.deleteAll();

        // 1. Utilisateurs
        List<Utilisateur> utilisateurs = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Utilisateur u = new Utilisateur();
            u.setNom("Nom" + i);
            u.setPrenom("Prenom" + i);
            u.setLogin("login" + i);
            u.setMotDePasse("pass" + i);
            u.setRole(i % 2 == 0 ? Role.ETUDIANT : Role.VIGILE);
            utilisateurs.add(u);
        }
        utilisateurRepository.saveAll(utilisateurs);

        // 2. Filières
        List<Filiere> filieres = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            Filiere f = new Filiere();
            f.setNom("Filiere " + i);
            filieres.add(f);
        }
        filiereRepository.saveAll(filieres);

        // 3. Classes
        List<Classe> classes = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Classe c = new Classe();
            c.setLibelle("Classe " + i);
            c.setNiveau("Niveau " + ((i % 3) + 1));
            c.setFiliere(filieres.get(i % filieres.size()));
            c.setAnneeScolaireId(List.of(UUID.randomUUID().toString()));
            classes.add(c);
        }
        classeRepository.saveAll(classes);

        // 4. Étudiants
        List<Etudiant> etudiants = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Etudiant etu = new Etudiant();
            etu.setMatricule("MATRICULE" + i);
            etu.setUtilisateurId(utilisateurs.get(i - 1).getId());
            etu.setTelephone("77000000" + i);
            etu.setClasseId(classes.get(i % classes.size()).getId());
            etu.setAbsenceIds(new ArrayList<>());
            etudiants.add(etu);
        }
        etudiantRepository.saveAll(etudiants);

        // 5. Vigiles
        List<Vigile> vigiles = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            Vigile v = new Vigile();
            v.setUtilisateurId(utilisateurs.get(i).getId());
            vigiles.add(v);
        }
        vigileRepository.saveAll(vigiles);

        // 6. Absences et liaison aux utilisateurs
        List<Absence> absences = new ArrayList<>();
        Map<String, List<Absence>> utilisateurAbsencesMap = new HashMap<>();

        for (int i = 1; i <= 6; i++) {
            Absence a = new Absence();
            Etudiant etu = etudiants.get(i % etudiants.size());

            a.setEtudiantId(etu.getId());
            a.setSessionId("SESSION" + i);
            a.setType(i % 2 == 0 ? Situation.ABSENCE : Situation.RETARD);
            a.setJustifiee(i % 2 == 0);
            a.setJustificationId("JUSTIF" + i);
            absences.add(a);

            // Ajouter ID à la liste d’absences de l’étudiant
            etu.getAbsenceIds().add(a.getId());

            // Lier aux utilisateurs via leur utilisateurId
            String utilisateurId = etu.getUtilisateurId();
            utilisateurAbsencesMap
                    .computeIfAbsent(utilisateurId, k -> new ArrayList<>())
                    .add(a);
        }
        absenceRepository.saveAll(absences);
        etudiantRepository.saveAll(etudiants);

        // 7. Affichage utilisateur → absences
        System.out.println("=== Liste des absences par utilisateur (étudiants) ===");
        utilisateurAbsencesMap.forEach((utilisateurId, listeAbsences) -> {
            Optional<Utilisateur> userOpt = utilisateurRepository.findById(utilisateurId);
            userOpt.ifPresent(user -> {
                System.out.println("Utilisateur : " + user.getPrenom() + " " + user.getNom());
                listeAbsences.forEach(abs -> System.out.println("  - Absence ID : " + abs.getId() + ", Session : " + abs.getSessionId()));
            });
        });

        System.out.println("=== Fixtures insérées avec succès ===");
    }
}
