package sn.ism.gestion.mobile.dto.Response;

import lombok.Getter;
import lombok.Setter;
import sn.ism.gestion.data.enums.ModeCours;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
public class SessionAllResponse {

    private String id;
    private LocalDate date;
    private LocalDateTime heureDebut;
    private LocalDateTime heureFin;
    private ModeCours mode;

}
