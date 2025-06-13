package sn.ism.gestion.data.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;

import sn.ism.gestion.data.entities.Absence;

public interface AbsenceRepository extends MongoRepository<Absence, String>{
    
}
