package sn.ism.gestion.data.repositories;


import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import sn.ism.gestion.data.entities.Etudiant;
import sn.ism.gestion.data.entities.Justification;

public interface EtudiantRepository extends MongoRepository<Etudiant, String>{

    Page<Etudiant> findAbsencesByEtudiant(String etudiantId, Pageable pageable);
    Optional<Etudiant> findEtudiantById(String etudiantId);
    Page<Justification> findJustificationsByEtudiant(String etudiantId, Pageable pageable);

}
