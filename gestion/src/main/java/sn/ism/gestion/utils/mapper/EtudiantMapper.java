package sn.ism.gestion.utils.mapper;

import org.mapstruct.Mapper;

import sn.ism.gestion.data.entities.Etudiant;

@Mapper(componentModel = "spring", uses = AbsenceMapper.class)
public interface EtudiantMapper {

    Etudiant toEntity(Etudiant request);

}