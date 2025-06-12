package sn.ism.gestion.data.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import sn.ism.gestion.data.entities.Paiement;

import java.util.List;
import java.util.Optional;

public interface PaiementRepository extends MongoRepository<Paiement, String>{

    Optional<Paiement> findByEtudiantIdAndMoisAndAnnee(String etudiantId, String mois, String annee);

}