package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;
import sn.ism.gestion.data.entities.Admin;

@Mapper(componentModel = "spring")
public interface AdminMapper {

    Admin toEntity(Admin request);

}
