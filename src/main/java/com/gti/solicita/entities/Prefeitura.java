package com.gti.solicita.entities;

import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tb_prefeituras")
@Getter
@Setter
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
public class Prefeitura implements Serializable {
    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @EqualsAndHashCode.Include
    private Long id;
    private String nome;
    private String endereco;
    private String contato;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String codCep;

    @OneToMany(mappedBy = "prefeitura")
    private List<Licitacao> licitacao = new ArrayList<>();

    public Prefeitura() {
    }

    public Prefeitura(Long id, String nome, String endereco, String complemento, String bairro, String cidade, String uf, String codCep, String contato) {
        this.id = id;
        this.nome = nome;
        this.endereco = endereco;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
        this.codCep = codCep;
        this.contato = contato;
    }

}
