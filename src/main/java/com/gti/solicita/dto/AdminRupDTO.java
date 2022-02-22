package com.gti.solicita.dto;

import com.gti.solicita.entities.AdminRup;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
public class AdminRupDTO implements Serializable {
    private static final long serialVersionUID = 1L;

    private Long id;
    private String email;
    private String senha;
    private String nomeCompleto;
    private String contato;

    private Set<RoleDTO> roles = new HashSet<>();

    public AdminRupDTO() {
    }

    public AdminRupDTO(Long id, String email, String senha, String nomeCompleto, String contato) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.nomeCompleto = nomeCompleto;
        this.contato = contato;
    }

    public AdminRupDTO(AdminRup admin) {
        this.id = admin.getId();
        this.email = admin.getEmail();
        this.senha = admin.getSenha();
        this.nomeCompleto = admin.getNomeCompleto();
        this.contato = admin.getContato();

        admin.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));
    }
}
