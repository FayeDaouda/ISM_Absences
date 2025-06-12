package sn.ism.gestion.mobile.controllers.Impl;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import sn.ism.gestion.mobile.controllers.IJustificationController;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;

import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("api/mobile/justifications")
@CrossOrigin(origins = "http://localhost:4200")
public class JustificationControllerImpl implements IJustificationController {

    @Override
    public ResponseEntity<Map<String, Object>> Create(@Valid JustificationRequest objet, BindingResult bindingResult) {
        return null;
    }

}
