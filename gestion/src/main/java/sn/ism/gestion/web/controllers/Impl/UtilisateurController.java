package sn.ism.gestion.web.controllers.Impl;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.entities.Utilisateur;
import sn.ism.gestion.data.services.IUtilisateurService;
import sn.ism.gestion.utils.mapper.UtilisateurMapper;
import sn.ism.gestion.web.controllers.IUtilisateurController;
import sn.ism.gestion.web.dto.Request.UtilisateurCreateRequest;
import sn.ism.gestion.web.dto.Response.RestResponse;
import sn.ism.gestion.web.dto.Response.UtilisateurSimpleResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/utilisateurs")
@CrossOrigin(origins = "http://localhost:4200")
public class UtilisateurController implements IUtilisateurController {

    private final IUtilisateurService utilisateurService;
    private final UtilisateurMapper utilisateurMapper;


    public ResponseEntity<Map<String, Object>> Create(
            UtilisateurCreateRequest request, BindingResult bindingResult) {
//
//       if (bindingResult.hasErrors()) {
//            Map<String, Object> errors = new HashMap<>();
//            for (FieldError error : bindingResult.getFieldErrors()) {
//                errors.put(error.getField(), error.getDefaultMessage());
//            }
//            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
//        }
//        Utilisateur utilisateur = utilisateurService.create(request);
//        Utilisateur entityUtilisateur = utilisateurMapper.toEntity(utilisateur);
//        return new ResponseEntity<>(RestResponse.response(
//            HttpStatus.CREATED,
//                entityUtilisateur,
//            "utilisateurCreate"), HttpStatus.CREATED);
        return  null;

    }


    @Override
    public ResponseEntity<Map<String, Object>> SelectAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Utilisateur> utilisateurs = utilisateurService.findAll(pageable);
        Page<UtilisateurSimpleResponse> response = utilisateurs.map(utilisateurMapper::toDto);
        return new ResponseEntity<>(
                RestResponse.responsePaginate(
                        HttpStatus.OK,
                        response.getContent(),
                        response.getNumber(),
                        response.getTotalPages(),
                        response.getTotalElements(),
                        response.isFirst(),
                        response.isLast(),
                        "utilisateurAllResponse"),
                HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Map<String, Object>> SelectdById(String id) {
        var utilisateur = utilisateurService.findById(id);
        var utilisateurDto = utilisateurMapper.toDto(utilisateur);
        return new ResponseEntity<>(
                new RestResponse().response(
                        HttpStatus.OK,utilisateurDto,
                        "utilisateurSimpleResponse"),
                HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Map<String, Object>> Update(String id, Utilisateur objet) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'Update'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> Delete(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'Delete'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> findByLogin(String login) {
        Utilisateur utilisateur = utilisateurService.findByLogin(login);
        UtilisateurSimpleResponse dto = utilisateurMapper.toDto(utilisateur);
        return new ResponseEntity<>(
                RestResponse.response(HttpStatus.OK, dto, "UtilisateurSimpleResponse"),
                HttpStatus.OK);
    }
    
}