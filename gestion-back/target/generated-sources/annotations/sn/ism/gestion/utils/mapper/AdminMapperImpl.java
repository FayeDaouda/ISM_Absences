package sn.ism.gestion.utils.mapper;

import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;
import sn.ism.gestion.data.entities.Admin;
import sn.ism.gestion.web.dto.Request.AdminSimpleRequest;
import sn.ism.gestion.web.dto.Response.AdminAllResponse;
import sn.ism.gestion.web.dto.Response.AdminSimpleResponse;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-06-12T22:35:01+0100",
    comments = "version: 1.6.3, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class AdminMapperImpl implements AdminMapper {

    @Override
    public AdminSimpleResponse toDto(Admin admin) {
        if ( admin == null ) {
            return null;
        }

        AdminSimpleResponse adminSimpleResponse = new AdminSimpleResponse();

        adminSimpleResponse.setUtilisateurId( admin.getUtilisateurId() );

        return adminSimpleResponse;
    }

    @Override
    public Admin toEntity(Admin request) {
        if ( request == null ) {
            return null;
        }

        Admin admin = new Admin();

        admin.setId( request.getId() );
        admin.setCreatedAt( request.getCreatedAt() );
        admin.setUpdatedAt( request.getUpdatedAt() );
        admin.setUtilisateurId( request.getUtilisateurId() );

        return admin;
    }

    @Override
    public AdminAllResponse toDtoAll(AdminAllResponse admin) {
        if ( admin == null ) {
            return null;
        }

        AdminAllResponse adminAllResponse = new AdminAllResponse();

        adminAllResponse.setId( admin.getId() );
        adminAllResponse.setNom( admin.getNom() );
        adminAllResponse.setPrenom( admin.getPrenom() );
        adminAllResponse.setLogin( admin.getLogin() );
        adminAllResponse.setUtilisateurId( admin.getUtilisateurId() );

        return adminAllResponse;
    }

    @Override
    public Admin toEntityR(AdminSimpleRequest request) {
        if ( request == null ) {
            return null;
        }

        Admin admin = new Admin();

        return admin;
    }
}
