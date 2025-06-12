package sn.ism.gestion.data.services.impl;

import java.time.LocalDate;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import sn.ism.gestion.data.entities.SessionCours;
import sn.ism.gestion.data.repositories.SessionsCoursRepository;
import sn.ism.gestion.data.services.ISessionCoursService;

@Service
public class SessionCoursServiceImpl implements ISessionCoursService {

    @Autowired
    private SessionsCoursRepository sessionCoursRepository;

    @Override
    public SessionCours create(SessionCours object) {
        return sessionCoursRepository.save(object);
    }

    @Override
    public SessionCours update(String id, SessionCours object) {
        SessionCours existing = sessionCoursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));
        object.setId(existing.getId());
        return sessionCoursRepository.save(object);
    }

    @Override
    public boolean delete(String id) {
        if (!sessionCoursRepository.existsById(id)) return false;
        sessionCoursRepository.deleteById(id);
        return true;
    }

    @Override
    public List<SessionCours> findAll() {
        return sessionCoursRepository.findAll();
    }

    @Override
    public Page<SessionCours> findAll(Pageable pageable) {
        return sessionCoursRepository.findAll(pageable);
    }

    @Override
    public SessionCours findById(String id) {
        return sessionCoursRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Session non trouvée"));
    }

    @Override
    public Page<SessionCours> getSessionsDuJour(LocalDate date, Pageable pageable) {
        return sessionCoursRepository.findByDate(LocalDate.now(), pageable);
    }

}
