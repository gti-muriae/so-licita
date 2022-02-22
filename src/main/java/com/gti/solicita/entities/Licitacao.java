package com.gti.solicita.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "tb_licitacao")
@Getter
@Setter
public class Licitacao implements Serializable {
    private static final long serialVersionUID = 1L;
    @EqualsAndHashCode.Include
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private Integer numLicitacao;
    private String descLicitacao;
    private Date datInicio;
    private Date datFinal;
    private Date datAmm;
    private String flgStatus;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_licitacao_categoria",
            joinColumns = @JoinColumn(name = "idLicitação"),
            inverseJoinColumns = @JoinColumn(name = "idCatgoria"))
    private Set<Categoria> categorias = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "prefeitura_id")
    private Prefeitura prefeitura;

    @OneToMany(mappedBy = "licitacao")
    private List<S3File> pdf;



}
