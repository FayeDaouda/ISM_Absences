package sn.ism.gestion.web.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Utilisateur;

import java.util.Map;

@RestController
@RequestMapping("/api/Utilisateurs")
public interface IUtilisateurController extends Controller<Utilisateur> {

    @GetMapping("/{id}")
    ResponseEntity<Map<String,Object>> findByLogin(@PathVariable String login);


}
