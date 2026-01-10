package sn.ism.gestion.data.repositories;


import org.springframework.data.mongodb.repository.MongoRepository;
import sn.ism.gestion.data.entities.Etudiant;

import java.util.List;
import java.util.Optional;

public interface EtudiantRepository extends MongoRepository<Etudiant, String>{

    Optional<Etudiant> findByMatricule(String matricule);
    Optional<Etudiant> findEtudiantById(String etudiantId);
    List<Etudiant> findByclasseId(String classeId);


}
