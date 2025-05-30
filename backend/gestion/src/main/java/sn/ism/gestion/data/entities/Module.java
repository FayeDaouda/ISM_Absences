package sn.ism.gestion.data.entities;

import lombok.Getter;
import lombok.Setter;

import org.springframework.data.mongodb.core.mapping.Document;

@Getter
@Setter
@Document(collection = "modules")
public class Module extends AbstractEntity 
{
    private String libelle;
    private String semestre;
}