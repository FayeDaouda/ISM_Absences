package sn.ism.gestion.mobile.dto.Response;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

//@Getter
//@Setter
//public class EtudiantSimpleResponse {
//
//    private String id;
//    private String nom;
//    private String prenom;
//    private String classe;
//    private String matricule;
//    private String telephone;
//    List<String> absences ;
//
//}
@Getter
@Setter
public class EtudiantSimpleResponse {
    private String id;
    private String nom;
    private String prenom;
    private String classe;
    private String matricule;
    private String telephone;
    private List<AbsenceAllResponse> absences;
}
