package com.gti.solicita.dto;

import com.gti.solicita.entities.Categoria;
import com.gti.solicita.entities.UsuarioRup;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.PastOrPresent;
import java.io.Serializable;
import java.util.*;

@Getter
@Setter
public class UsuarioRupDTO implements Serializable {

    private static final long serialVersionUID = 1L;
    private Long id;
    @NotEmpty(message = "Campo obrigatório")
    @Email
    @NotEmpty(message = "Campo obrigatório")
    private String email;
    private String senha;
    @NotEmpty(message = "Campo obrigatório")
    private String cpf;
    private String contato;
    @PastOrPresent(message = "Data de abertura não pode ser futura!")
    private Date datAbertura;
    @NotEmpty(message = "Campo obrigatório")
    private String nomeCompleto;
    private String endereco;
    private String numEndereco;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String codCep;
    private String razSocial;
    private Integer codCNPJ;
    private String fcmToken;

    private List<CategoriaDTO> categorias = new ArrayList<>();
    private Set<RoleDTO> roles = new HashSet<>();

    public UsuarioRupDTO() {
    }

    public UsuarioRupDTO(Long id, String email, String senha, String cpf, String contato, Date datAbertura, String nomeCompleto, String endereco, String numEndereco, String complemento, String bairro, String cidade, String uf, String codCep, String razSocial, Integer codCNPJ, String fcmToken) {
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

    public UsuarioRupDTO(UsuarioRup usuarioRup) {
        this.id = usuarioRup.getId();
        this.email = usuarioRup.getEmail();
        this.senha = usuarioRup.getSenha();
        this.cpf = usuarioRup.getCpf();
        this.contato = usuarioRup.getContato();
        this.datAbertura = usuarioRup.getDatAbertura();
        this.nomeCompleto = usuarioRup.getNomeCompleto();
        this.endereco = usuarioRup.getEndereco();
        this.numEndereco = usuarioRup.getNumEndereco();
        this.complemento = usuarioRup.getComplemento();
        this.bairro = usuarioRup.getBairro();
        this.cidade = usuarioRup.getCidade();
        this.uf = usuarioRup.getUf();
        this.codCep = usuarioRup.getCodCep();
        this.razSocial = usuarioRup.getRazSocial();
        this.codCNPJ = usuarioRup.getCodCNPJ();
        this.fcmToken = usuarioRup.getFcmToken();
        usuarioRup.getRoles().forEach(role -> this.roles.add(new RoleDTO(role)));


    }

    public UsuarioRupDTO(UsuarioRup usuario, Set<Categoria> categorias) {
        this(usuario);
        categorias.forEach(x -> this.categorias.add(new CategoriaDTO(x)));
    }
}
