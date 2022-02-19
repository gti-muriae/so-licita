package com.gti.solicita.dto;

import com.gti.solicita.entities.Licitacao;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

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
    private Long categoriaId;
    private Long prefeituraId;

    public LicitacaoDTO() {
    }

    public LicitacaoDTO(Long id, Integer numLicitacao, String descLicitacao, Date datInicio, Date datFinal, Date datAmm, String flgStatus, Long categoriaId, Long prefeituraId) {
        this.id = id;
        this.numLicitacao = numLicitacao;
        this.descLicitacao = descLicitacao;
        this.datInicio = datInicio;
        this.datFinal = datFinal;
        this.datAmm = datAmm;
        this.flgStatus = flgStatus;
        this.categoriaId = categoriaId;
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
        this.categoriaId = entity.getCategoria().getId();
        this.prefeituraId = entity.getPrefeitura().getId();


    }
}
