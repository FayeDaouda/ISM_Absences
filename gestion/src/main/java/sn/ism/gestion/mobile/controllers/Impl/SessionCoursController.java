package sn.ism.gestion.mobile.controllers.Impl;

import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import sn.ism.gestion.mobile.controllers.ISessionCoursController;

import java.time.LocalDate;
import java.util.Map;

@AllArgsConstructor
@RestController
public class SessionCoursController implements ISessionCoursController {

    @Override
    public ResponseEntity<Map<String, Object>> findById(String id) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findById'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> getSessionsDuJour(LocalDate date, int page, int size) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getSessionsDuJour'");
    }
    
}
