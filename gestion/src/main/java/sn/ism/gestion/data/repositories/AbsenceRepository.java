package sn.ism.gestion.data.repositories;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.repository.MongoRepository;

import sn.ism.gestion.data.entities.Absence;
import sn.ism.gestion.data.enums.Situation;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface AbsenceRepository extends MongoRepository<Absence, String>{

   Page<Absence> findByDate(LocalDate Date, Pageable pageable);
   Page<Absence> findByType(Situation type, Pageable pageable);
   Page<Absence> findByEtudiantIdAndType(String etudiantId, Situation type, Pageable pageable);
   List<Absence> findAbsenceByEtudiantIdAndType(String etudiantId, Situation type);
   Optional<Absence> findOneBySessionIdAndEtudiantId(String sessionId, String etudiantId);
//   Page<Absence> findByTypeIn(List<Situation> types, Pageable pageable);

}
