package com.gti.solicita.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@Table(name = "tb_adminRup")
@Entity
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class AdminRup implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String email;
    private String senha;
    private String nomeCompleto;
    private String contato;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_admin_role", joinColumns =
    @JoinColumn(name = "idAdmin"), inverseJoinColumns =
    @JoinColumn(name = "idRole"))
    private Set<Role> roles = new HashSet<>();
}
