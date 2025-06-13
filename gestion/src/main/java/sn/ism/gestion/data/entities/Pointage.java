package sn.ism.gestion.data.entities;

import java.time.LocalDateTime;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Setter;
import sn.ism.gestion.data.enums.Situation;
import lombok.Getter;

@Getter
@Setter 
@Document(collection = "pointage")
public class Pointage {
   
    private String etudiantId;
    private String vigileId;
    private LocalDateTime dateHeure;
    private String sessionCoursId;

    private Situation type;

}
