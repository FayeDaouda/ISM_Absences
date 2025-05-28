package sn.ism.gestion.data.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import sn.ism.gestion.data.entities.Absence;

public interface AbsenceRepository extends MongoRepository<Absence, String>{
    
    Page<Absence> findByEtudiantId(String etudiantId, Pageable pageable);

}
