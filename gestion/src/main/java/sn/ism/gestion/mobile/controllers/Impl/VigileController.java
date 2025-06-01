package sn.ism.gestion.mobile.controllers.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.annotation.*;
import sn.ism.gestion.data.entities.Vigile;
import sn.ism.gestion.data.services.IAbsenceService;
import sn.ism.gestion.data.services.IVigileService;
import sn.ism.gestion.mobile.controllers.IVigileController;
import sn.ism.gestion.utils.mapper.AbsenceMapper;
import sn.ism.gestion.utils.mapper.VigileMapper;
import sn.ism.gestion.web.dto.Request.VigileSimpleRequest;
import sn.ism.gestion.web.dto.Response.AbsenceAllResponse;
import sn.ism.gestion.web.dto.Response.VigileAllResponse;
import sn.ism.gestion.web.dto.RestResponse;

import java.time.LocalDate;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/mobile/vigiles")
@CrossOrigin(origins = "http://localhost:4200")
public class VigileController implements IVigileController {

    private final IVigileService vigileService;
    private final VigileMapper vigileMapper;
    private final IAbsenceService absenceService;
    private final AbsenceMapper absenceMapper;

    @Override
    public ResponseEntity<Map<String, Object>> Create(VigileSimpleRequest request, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, Object> errors = new HashMap<>();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errors.put(error.getField(), error.getDefaultMessage());
            }
            return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
        }
        Vigile vigile = vigileService.createVigile(request);
        Vigile entityVigile = vigileMapper.toEntity(vigile);

        return new ResponseEntity<>(RestResponse.response(HttpStatus.CREATED, entityVigile, "Vigile"), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Map<String, Object>> pointerEtudiant(String matricule) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> SelectAll(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<VigileAllResponse> vigiles = vigileService.getAllVigiles(pageable);
        Page<VigileAllResponse> response = vigiles.map(vigileMapper::toDtoAll);
        return new ResponseEntity<>(
                RestResponse.responsePaginate(
                        HttpStatus.OK,
                        response.getContent(),
                        response.getNumber(),
                        response.getTotalPages(),
                        response.getTotalElements(),
                        response.isFirst(),
                        response.isLast(),
                        "vigileAllResponse"),
                HttpStatus.OK);
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> SelectdById(String id) {
        var vigile = vigileService.findById(id);
        var vigileDto = vigileMapper.toDto(vigile);
        return new ResponseEntity<>(
                new RestResponse().response(
                        HttpStatus.OK,vigileDto,
                        "vigileSimpleResponse"),
                HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Map<String, Object>> Update(String id, Vigile request) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> Delete(String id) {
        return null;
    }

    @Override
    public ResponseEntity<Map<String, Object>> getAllPointagesDuJour(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "5") int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<AbsenceAllResponse> absences = absenceService.getAllPointagesDuJour(LocalDate.now(),pageable);
        Page<AbsenceAllResponse> response = absences.map(absenceMapper::toDto);
        return new ResponseEntity<>(
                RestResponse.responsePaginate(
                        HttpStatus.OK,
                        response.getContent(),
                        response.getNumber(),
                        response.getTotalPages(),
                        response.getTotalElements(),
                        response.isFirst(),
                        response.isLast(),
                        "PointageAllResponses"),
                HttpStatus.OK);
    }
}
