package sn.ism.gestion;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.*;
import sn.ism.gestion.data.enums.ModeCours;
import sn.ism.gestion.data.enums.Role;
import sn.ism.gestion.data.enums.Situation;
import sn.ism.gestion.data.repositories.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;

@Component
public class DataInitializer {

    @Autowired private UtilisateurRepository utilisateurRepository;
    @Autowired private EtudiantRepository etudiantRepository;
    @Autowired private ClasseRepository classeRepository;
    @Autowired private FiliereRepository filiereRepository;
    @Autowired private VigileRepository vigileRepository;
    @Autowired private AbsenceRepository absenceRepository;
    @Autowired private SessionsCoursRepository sessionCoursRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        // Nettoyage
        absenceRepository.deleteAll();
        sessionCoursRepository.deleteAll();
        vigileRepository.deleteAll();
        etudiantRepository.deleteAll();
        classeRepository.deleteAll();
        filiereRepository.deleteAll();
        utilisateurRepository.deleteAll();

        // 1. Utilisateurs
        List<Utilisateur> utilisateurs = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Utilisateur u = new Utilisateur();
            u.setNom("Nom" + i);
            u.setPrenom("Prenom" + i);
            u.setLogin("login" + i);
            u.setMotDePasse(passwordEncoder.encode("pass" + i));
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
            c.setFiliereId(filieres.get((i - 1) % filieres.size()).getId());
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
            if (utilisateurs.get(i).getRole() == Role.VIGILE) {
                Vigile v = new Vigile();
                v.setUtilisateurId(utilisateurs.get(i).getId());
                vigiles.add(v);
            }
        }
        vigileRepository.saveAll(vigiles);

        // 6. Sessions de cours (ajoutées)
        List<SessionCours> sessions = new ArrayList<>();
        for (Classe classe : classes) {
            for (int j = 0; j < 5; j++) { // 5 jours de sessions pour chaque classe
                SessionCours session = new SessionCours();
                session.setClasseId(classe.getId());
                session.setDate(LocalDate.now().plusDays(j));

                LocalDateTime heureDebut = LocalDate.now().plusDays(j).atTime(8, 0); // 08h00
                LocalDateTime heureFin = heureDebut.plusHours(2); // 2h de cours

                session.setHeureDebut(heureDebut);
                session.setHeureFin(heureFin);
                session.setNombreHeures("2");
                session.setMode(ModeCours.PRESENTIEL);
                session.setValide(true);

                // Etudiants attendus
                List<Etudiant> etudiantsClasse = etudiantRepository.findByclasseId(classe.getId());
                List<String> etudiantsIds = etudiantsClasse.stream().map(Etudiant::getId).toList();
                session.setEtudiantsAttendus(etudiantsIds);

                sessions.add(session);
            }
        }
        sessionCoursRepository.saveAll(sessions);
        System.out.println("=== Sessions de cours générées ===");

        // 7. Absences (liées aux étudiants) - exemple simple
        List<Absence> absences = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Etudiant etu = etudiants.get(i % etudiants.size());
            Absence a = new Absence();
            a.setEtudiantId(etu.getId());
            a.setSessionId("SESSION" + i);
            a.setType(i % 2 == 0 ? Situation.ABSENCE : Situation.RETARD);
            a.setJustifiee(i % 2 == 0);
            a.setJustificationId("JUSTIF" + i);
            absences.add(a);

            // Associer à l’étudiant
            etu.getAbsenceIds().add(a.getId());
        }
        absenceRepository.saveAll(absences);
        etudiantRepository.saveAll(etudiants); // mise à jour des IDs d’absence

        // 8. Affichage
        System.out.println("=== Liste des absences par utilisateur (étudiants) ===");
        for (Etudiant e : etudiants) {
            utilisateurRepository.findById(e.getUtilisateurId()).ifPresent(user -> {
                System.out.println("Utilisateur : " + user.getPrenom() + " " + user.getNom());
                e.getAbsenceIds().forEach(id -> System.out.println("  - Absence ID : " + id));
            });
        }

        System.out.println("=== Fixtures insérées avec succès ===");
    }

    /**
     * Initialisation automatique des absences chaque jour à 6h du matin
     */
    @Scheduled(cron = "0 0 6 * * *")
    public void initialiserAbsencesDuJour() {
        LocalDate dateDuJour = LocalDate.now();
        List<SessionCours> sessionsDuJour = sessionCoursRepository.getSessionsDuJour(dateDuJour);

        List<Absence> absences = new ArrayList<>();

        for (SessionCours session : sessionsDuJour) {
            List<Etudiant> etudiants = etudiantRepository.findByclasseId(session.getClasseId());
            for (Etudiant etudiant : etudiants) {
                Optional<Absence> dejaCree = absenceRepository
                        .findOneBySessionIdAndEtudiantId(session.getId(), etudiant.getId());
                if (dejaCree.isEmpty()) {
                    Absence absence = new Absence();
                    absence.setEtudiantId(etudiant.getId());
                    absence.setSessionId(session.getId());
                    absence.setType(Situation.ABSENCE);
                    absence.setJustifiee(false);
                    absences.add(absence);
                }
            }
        }

        if (!absences.isEmpty()) {
            absenceRepository.saveAll(absences);
            System.out.println("Absences initialisées pour " + absences.size() + " étudiants à la date " + dateDuJour);
        } else {
            System.out.println("Aucune absence initialisée ce jour : " + dateDuJour);
        }
    }
}
