package sn.ism.gestion.data.services.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sn.ism.gestion.data.entities.Justification;
import sn.ism.gestion.data.repositories.JustificationRepository;
import sn.ism.gestion.data.services.IJustificationService;
import sn.ism.gestion.mobile.dto.Request.JustificationRequest;
import sn.ism.gestion.utils.mapper.JustificationMapper;

import java.util.List;

@Service
public class JustificationServiceImpl implements IJustificationService {
    @Autowired
    private JustificationRepository justificationRepository;

    @Autowired
    private JustificationMapper justificationMapper;



    @Override
    public Justification create(Justification object) {
        return justificationRepository.save(object);

    }

    @Override
    public Justification createJustication(JustificationRequest justificationRequest) {
        Justification justificationCreate = justificationMapper.toEntityR(justificationRequest);
        return justificationRepository.save(justificationCreate);
    }

    @Override
    public Justification update(String id, Justification object) {
        return null;
    }


    @Override
    public Page<Justification> findAll(Pageable pageable) {
        return justificationRepository.findAll(pageable);
    }

    @Override
    public boolean delete(String id) {
        if (!justificationRepository.existsById(id)) {
            return false;
        }
        justificationRepository.deleteById(id);
        return true;
    }

    @Override
    public Justification findById(String id) {
        return justificationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Justification non trouvée avec ID : " + id));
    }

    @Override
    public List<Justification> findAll() {
        return justificationRepository.findAll();
    }
}
