package sn.ism.gestion.data.repositories;


import java.util.List;
import java.util.Optional;
import org.springframework.data.mongodb.repository.MongoRepository;
import sn.ism.gestion.data.entities.Etudiant;

public interface EtudiantRepository extends MongoRepository<Etudiant, String>{

    Optional<Etudiant> findByMatricule(String matricule);
    Optional<Etudiant> findEtudiantById(String etudiantId);
    List<Etudiant> findByclasseId(String classeId);


}
