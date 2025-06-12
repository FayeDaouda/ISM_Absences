package sn.ism.gestion.data.entities;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import sn.ism.gestion.data.enums.Role;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@Getter
@Setter
@Document(collection = "utilisateurs")
public class Utilisateur extends AbstractEntity {

    private String nom;
    private String prenom;
    private String login;
    private String motDePasse;
    private String photo;
    private Role role;

    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_" + this.role.name()));
    }
}
