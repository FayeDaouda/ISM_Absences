package sn.ism.gestion.data.entities;

import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.enums.ModeCours;

@Getter
@Setter
@Document(collection = "sessions")
public class SessionCours extends AbstractEntity {

    private LocalDate date;
    private LocalDateTime heureDebut;
    private LocalDateTime heureFin;
    private String nombreHeures;
    private ModeCours mode;
    private String classeId;
    private boolean valide;
    private List<String> etudiantsAttendus;

}
