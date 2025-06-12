package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.SessionCours;

@Mapper(componentModel = "spring")
public interface SessionMapper {

    SessionCours toEntity(SessionCours sessionCours);

}
