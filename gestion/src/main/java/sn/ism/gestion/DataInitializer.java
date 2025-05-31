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

import java.math.BigDecimal;
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
    @Autowired private PaiementRepository paiementRepository;
    @Autowired private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void init() {
        // Nettoyage
        absenceRepository.deleteAll();
        sessionCoursRepository.deleteAll();
        vigileRepository.deleteAll();
        paiementRepository.deleteAll();
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
            u.setPhoto("kiki.png");
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

        // 4bis. Paiements
        List<Paiement> paiements = new ArrayList<>();
        for (Etudiant etudiant : etudiants) {
            for (int j = 1; j <= 3; j++) { // 3 paiements par étudiant
                Paiement paiement = new Paiement();
                paiement.setEtudiantId(etudiant.getId());
                paiement.setMontant(new BigDecimal("100000"));
                paiement.setDatePaiement(LocalDate.now().minusMonths(j));
                paiements.add(paiement);
            }
        }
        paiementRepository.saveAll(paiements);
        System.out.println("=== Paiements générés pour les étudiants ===");

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

        // 6. Sessions de cours
        List<SessionCours> sessions = new ArrayList<>();
        for (Classe classe : classes) {
            for (int j = 0; j < 5; j++) {
                SessionCours session = new SessionCours();
                session.setClasseId(classe.getId());
                session.setDate(LocalDate.now().plusDays(j));
                session.setHeureDebut(LocalDate.now().plusDays(j).atTime(8, 0));
                session.setHeureFin(session.getHeureDebut().plusHours(2));
                session.setNombreHeures("2");
                session.setMode(ModeCours.PRESENTIEL);
                session.setValide(true);

                List<Etudiant> etudiantsClasse = etudiantRepository.findByclasseId(classe.getId());
                List<String> etudiantsIds = etudiantsClasse.stream().map(Etudiant::getId).toList();
                session.setEtudiantsAttendus(etudiantsIds);

                sessions.add(session);
            }
        }
        sessionCoursRepository.saveAll(sessions);
        System.out.println("=== Sessions de cours générées ===");

        // 7. Absences fictives
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
            etu.getAbsenceIds().add(a.getId());
        }
        absenceRepository.saveAll(absences);
        etudiantRepository.saveAll(etudiants);

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
