package com.gti.solicita.dto;

import com.gti.solicita.entities.Prefeitura;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class PrefeituraDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String nome;
    private String endereco;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf;
    private String codCep;
    private String contato;

    public PrefeituraDTO() {
    }

    public PrefeituraDTO(Long id, String nome, String endereco, String complemento, String bairro, String cidade, String uf, String codCep, String contato) {
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

    public PrefeituraDTO(Prefeitura prefeitura) {
        this.id = prefeitura.getId();
        this.nome = prefeitura.getNome();
        this.endereco = prefeitura.getEndereco();
        this.complemento = prefeitura.getComplemento();
        this.bairro = prefeitura.getBairro();
        this.cidade = prefeitura.getCidade();
        this.uf = prefeitura.getUf();
        this.codCep = prefeitura.getCodCep();
        this.contato = prefeitura.getContato();
    }
}
