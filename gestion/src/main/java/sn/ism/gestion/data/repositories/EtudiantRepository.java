package sn.ism.gestion.data.repositories;


import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import sn.ism.gestion.data.entities.Etudiant;

public interface EtudiantRepository extends MongoRepository<Etudiant, String>{

    // Page<Etudiant> findAbsencesByEtudiant(String etudiantId, Pageable pageable);
    Optional<Etudiant> findByMatricule(String matricule);
    Optional<Etudiant> findEtudiantById(String etudiantId);
    // Page<Justification> findJustificationsByEtudiant(String etudiantId, Pageable pageable);

}
