package sn.ism.gestion.data.repositories;

import sn.ism.gestion.data.entities.SessionCours;

import java.time.LocalDateTime;

import org.springdoc.core.converters.models.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface SessionsCoursRepository extends MongoRepository<SessionCours, String> {
   
    Page<SessionCours> findByDate(LocalDateTime dateHeure ,Pageable pageable);
}
