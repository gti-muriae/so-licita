package com.gti.solicita.entities;

import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Collection;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;


@Getter
@Setter
@Entity
@Table(name = "tb_usuarioRup")
public class UsuarioRup implements UserDetails, Serializable {

    private static final long serialVersionUID = 1L;
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_categoria_usuario", joinColumns =
    @JoinColumn(name = "idUsuario"), inverseJoinColumns =
    @JoinColumn(name = "idCategoria"))
    Set<Categoria> categorias = new HashSet<>();
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @Column(unique = true)
    private String email;
    private String senha;
    private String cpf;
    private String contato;
    private Date datAbertura;
    private String nomeCompleto;
    private String endereco;
    private String numEndereco;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String codCep;
    @Column(unique = true)
    private String razSocial;
    @Column(unique = true)
    private Integer codCNPJ;
    private String fcmToken;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "tb_usuario_role", joinColumns =
    @JoinColumn(name = "idUsuario"), inverseJoinColumns =
    @JoinColumn(name = "idRole"))
    private Set<Role> roles = new HashSet<>();

    public UsuarioRup() {
    }

    public UsuarioRup(Long id, String email, String senha, String cpf, String contato, Date datAbertura, String nomeCompleto, String endereco, String numEndereco, String complemento, String bairro, String cidade, String uf, String codCep, String razSocial, Integer codCNPJ, String fcmToken) {
        this.id = id;
        this.email = email;
        this.senha = senha;
        this.cpf = cpf;
        this.contato = contato;
        this.datAbertura = datAbertura;
        this.nomeCompleto = nomeCompleto;
        this.endereco = endereco;
        this.numEndereco = numEndereco;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.codCep = codCep;
        this.razSocial = razSocial;
        this.codCNPJ = codCNPJ;
        this.fcmToken = fcmToken;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return roles.stream().map(x -> new SimpleGrantedAuthority(x.getAuthority())).collect(Collectors.toList());
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
