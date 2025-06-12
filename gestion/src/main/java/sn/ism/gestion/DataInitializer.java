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
        absenceRepository.deleteAll();
        sessionCoursRepository.deleteAll();
        vigileRepository.deleteAll();
        paiementRepository.deleteAll();
        etudiantRepository.deleteAll();
        classeRepository.deleteAll();
        filiereRepository.deleteAll();
        utilisateurRepository.deleteAll();

        List<Utilisateur> utilisateurs = new ArrayList<>();
        for (int i = 1; i <= 6; i++) {
            Utilisateur u = new Utilisateur();
            u.setNom("Nom" + i);
            u.setPrenom("Prenom" + i);
            u.setLogin("login" + i);
            u.setMotDePasse(passwordEncoder.encode("pass" + i));
            u.setPhoto("absent.img");

            if (i % 3 == 0) {
                u.setRole(Role.ADMIN);
            } else if (i % 3 == 1) {
                u.setRole(Role.ETUDIANT);
            } else {
                u.setRole(Role.VIGILE);
            }

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

        List<Paiement> paiements = new ArrayList<>();
        for (int i = 0; i < etudiants.size(); i++) {
            Etudiant etudiant = etudiants.get(i);
            for (int j = 1; j <= 3; j++) {
                Paiement paiement = new Paiement();
                paiement.setEtudiantId(etudiant.getId());
                paiement.setMontant(new BigDecimal("100000"));
                paiement.setDatePaiement(LocalDate.now().minusMonths(j + i)); // dates différentes
                paiements.add(paiement);
            }
        }
        paiementRepository.saveAll(paiements);

        List<Vigile> vigiles = new ArrayList<>();
        for (int i = 0; i < 6; i++) {
            if (utilisateurs.get(i).getRole() == Role.VIGILE) {
                Vigile v = new Vigile();
                v.setUtilisateurId(utilisateurs.get(i).getId());
                vigiles.add(v);
            }
        }
        vigileRepository.saveAll(vigiles);

        List<SessionCours> sessions = new ArrayList<>();
        for (int i = 0; i < classes.size(); i++) {
            Classe classe = classes.get(i);
            for (int j = 0; j < 5; j++) {
                SessionCours session = new SessionCours();
                LocalDate dateSession = LocalDate.now().minusDays(i * 2 + j); // dates différentes
                session.setClasseId(classe.getId());
                session.setDate(dateSession);
                session.setHeureDebut(dateSession.atTime(8 + (j % 3), 0));
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

        List<Absence> absences = new ArrayList<>();
        List<SessionCours> sessionsReelles = sessionCoursRepository.findAll();

        for (int i = 0; i < etudiants.size(); i++) {
            Etudiant etudiant = etudiants.get(i);
            for (int j = 0; j < 2; j++) {
                Absence a = new Absence();
                a.setEtudiantId(etudiant.getId());

                SessionCours session = sessionsReelles.get((i + j) % sessionsReelles.size());
                a.setSessionId(session.getId());
                a.setType(j % 2 == 0 ? Situation.ABSENCE : Situation.RETARD);
                a.setJustifiee(j % 2 == 0);
                a.setJustificationId("JUSTIF-" + etudiant.getId() + "-" + j);
                a.setDate(LocalDate.now().minusDays(i + j)); // date différente
                absences.add(a);
            }
        }
        absenceRepository.saveAll(absences);

        for (Etudiant etudiant : etudiants) {
            List<String> ids = absences.stream()
                    .filter(a -> a.getEtudiantId().equals(etudiant.getId()))
                    .map(Absence::getId)
                    .toList();
            etudiant.setAbsenceIds(ids);
        }
        etudiantRepository.saveAll(etudiants);

        System.out.println("=== Fixtures insérées avec succès ===");
    }

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
                    absence.setDate(LocalDate.now());
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
