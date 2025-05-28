package sn.ism.gestion.data.entities;

import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Document(collection = "professeurs")
public class Professeur extends AbstractEntity 
{
    private String utilisateurId; 
    private List<String> moduleIds;

}