package sn.ism.gestion.web.controllers.Impl;

import java.util.Map;

import org.springframework.http.ResponseEntity;

import sn.ism.gestion.data.entities.Pointage;
import sn.ism.gestion.web.controllers.IPointageController;

public class PointageContoller implements IPointageController {

    @Override
    public ResponseEntity<Pointage> pointerQrCode(String studentId, String vigileId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'pointerQrCode'");
    }

    @Override
    public ResponseEntity<Map<String, Object>> pointerManuellement(String matricule, String vigileId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'pointerManuellement'");
    }
    
}
