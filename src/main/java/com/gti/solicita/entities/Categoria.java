package com.gti.solicita.entities;

import lombok.*;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@Entity
@Table(name = "tb_categoria")
public class Categoria implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String categoria;
    private String descCategoria;

    @ManyToMany(mappedBy = "categorias")
    private Set<UsuarioRup> usuarioRups = new HashSet<>();

    @OneToMany(mappedBy = "categoria")
    private List<Licitacao> licitacao;
}
