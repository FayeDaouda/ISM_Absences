package sn.ism.gestion.mobile.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mobile/utilisateurs")
public interface IUtilisateurController {

    @GetMapping("/login")
    ResponseEntity<Map<String,Object>> findByLogin(@PathVariable String login);


}
