package sn.ism.gestion.web.dto.Response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EtudiantWithListeAbsenceResponse {


    private String id;
    List<String> absenceIds ;
}
