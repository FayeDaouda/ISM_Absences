package sn.ism.gestion.web.controllers;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import sn.ism.gestion.Config.Controller;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.web.dto.Request.UtilisateurCreateRequest;

import java.util.Map;

@RestController
@RequestMapping("/api/Utilisateurs")
public interface IUtilisateurController extends Controller<Utilisateur> {

    @PostMapping("")
    ResponseEntity<Map<String, Object>> Create(@Valid @RequestBody UtilisateurCreateRequest objet,
                                               BindingResult bindingResult);

    @GetMapping("/login")
    ResponseEntity<Map<String,Object>> findByLogin(@PathVariable String login);


}
