package sn.ism.gestion.data.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.enums.ModeCours;

@Getter
@Setter
@Document(collection = "sessions")
public class SessionCours extends AbstractEntity {

    private String coursId;
    private LocalDateTime heureDebut;
    private LocalDateTime heureFin;
    private int nombreHeures;
    private ModeCours mode;
    private String salleId;
    private boolean valide;
    private LocalDate date;

}
