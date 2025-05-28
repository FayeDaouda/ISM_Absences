package sn.ism.gestion.data.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;
import sn.ism.gestion.data.entities.Pointage;

public interface PointageRepository extends MongoRepository<Pointage, String>{
    
    Page<Pointage> findByEtudiantId(String etudiantId, Pageable pageable);
}
