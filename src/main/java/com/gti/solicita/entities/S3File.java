package com.gti.solicita.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.Instant;

@Entity
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "tb_file_upload")
public class S3File {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long id;
    private String fileName;
    private String fileType;
    @Column(columnDefinition = "TIMESTAMP WITHOUT TIME ZONE")
    private Instant date;

    @ManyToOne
    @JoinColumn(name = "id_Licitacao")
    private Licitacao licitacao;

    public S3File() {
    }

    public S3File(String fileName, String fileType, Instant date) {
        this.fileName = fileName;
        this.fileType = fileType;
        this.date = date;
    }
}
