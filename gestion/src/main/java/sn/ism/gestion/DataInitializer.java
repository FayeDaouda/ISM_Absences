package sn.ism.gestion;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.*;
import sn.ism.gestion.data.enums.Role;
import sn.ism.gestion.data.enums.Situation;
import sn.ism.gestion.data.repositories.*;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

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

        List<Filiere> filieres = new ArrayList<>();
        for (int i = 1; i <= 2; i++) {
            Filiere f = new Filiere();
            f.setNom("Filiere " + i);
            filieres.add(f);
        }
        filiereRepository.saveAll(filieres);

        // 2. Classes
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

        // ==== 3. Étudiants ====
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

        List<Vigile> vigiles = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            Vigile v = new Vigile();
            v.setUtilisateurId(utilisateurs.get(i).getId());
            vigiles.add(v);
        }
        vigileRepository.saveAll(vigiles);

        List<Absence> absences = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Absence a = new Absence();
            a.setEtudiantId(etudiants.get(i % etudiants.size()).getId());
            a.setSessionId("SESSION" + i);
            a.setType(i % 2 == 0 ? Situation.ABSENCE : Situation.RETARD);
            a.setJustifiee(i % 2 == 0);
            a.setJustificationId("JUSTIF" + i);
            absences.add(a);

            etudiants.get(i % etudiants.size()).getAbsenceIds().add(a.getId());
        }
        absenceRepository.saveAll(absences);
        etudiantRepository.saveAll(etudiants);

        System.out.println("=== Fixtures insérées avec succès ===");
    }
}
