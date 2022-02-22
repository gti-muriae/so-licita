package com.gti.solicita.dto;

import com.gti.solicita.entities.Categoria;
import com.gti.solicita.entities.Licitacao;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
public class LicitacaoDTO {
    private Long id;
    private Integer numLicitacao;
    private String descLicitacao;
    private Date datInicio;
    private Date datFinal;
    private Date datAmm;
    private String flgStatus;
    private List<CategoriaDTO> categorias = new ArrayList<>();
    private Long prefeituraId;

    public LicitacaoDTO() {
    }

    public LicitacaoDTO(Long id, Integer numLicitacao, String descLicitacao, Date datInicio, Date datFinal, Date datAmm, String flgStatus, Long prefeituraId) {
        this.id = id;
        this.numLicitacao = numLicitacao;
        this.descLicitacao = descLicitacao;
        this.datInicio = datInicio;
        this.datFinal = datFinal;
        this.datAmm = datAmm;
        this.flgStatus = flgStatus;
        this.prefeituraId = prefeituraId;
    }

    public LicitacaoDTO(Licitacao entity) {
        this.id = entity.getId();
        this.numLicitacao = entity.getNumLicitacao();
        this.descLicitacao = entity.getDescLicitacao();
        this.datAmm = entity.getDatAmm();
        this.datInicio = entity.getDatInicio();
        this.datFinal = entity.getDatFinal();
        this.flgStatus = entity.getFlgStatus();
        this.prefeituraId = entity.getPrefeitura().getId();
    }

    public LicitacaoDTO(Licitacao licitacao, Set<Categoria> categorias) {
        this(licitacao);
        categorias.forEach(x -> this.categorias.add(new CategoriaDTO(x)));
    }
}
