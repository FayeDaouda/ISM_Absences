package sn.ism.gestion.data.entities;

import java.time.LocalDateTime;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import lombok.AllArgsConstructor;
import lombok.Data;


@MappedSuperclass
@AllArgsConstructor
@Data
public abstract class AbstractEntity{
    @Id
    
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    protected String id;

    @Column(name = "created_at")
    protected LocalDateTime createdAt;

    @Column(name = "updated_at")
    protected LocalDateTime updatedAt;

    protected AbstractEntity()
    {
    }

    @PrePersist
    public void onPrePersist()
    {
        this.setCreatedAt(LocalDateTime.now());
        this.setUpdatedAt(LocalDateTime.now());
    }

    @PreUpdate
    public void onPreUpdate()
    {
        this.setUpdatedAt(LocalDateTime.now());
    }

}