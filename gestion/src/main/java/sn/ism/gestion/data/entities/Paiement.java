package sn.ism.gestion.data.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@Document(collection = "paiements")
public class Paiement extends AbstractEntity {

    private String id;
    private String etudiantId;
    private String mois;   // <-- Ajout du champ mois
    private String annee;
    private LocalDate datePaiement;
    private BigDecimal montant;
}
