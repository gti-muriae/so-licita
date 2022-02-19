package com.gti.solicita.service;

import com.gti.solicita.dto.LicitacaoDTO;
import com.gti.solicita.entities.Categoria;
import com.gti.solicita.entities.Licitacao;
import com.gti.solicita.entities.Prefeitura;
import com.gti.solicita.repositories.CategoriaRepository;
import com.gti.solicita.repositories.LicitacaoRepository;
import com.gti.solicita.repositories.PrefeituraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LicitacaoService {
    @Autowired
    private LicitacaoRepository licitacaoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private PrefeituraRepository prefeituraRepository;


    private void copy(Licitacao entity, LicitacaoDTO dto) {
        entity.setNumLicitacao(dto.getNumLicitacao());
        entity.setDescLicitacao(dto.getDescLicitacao());
        entity.setDatAmm(dto.getDatAmm());
        entity.setDatInicio(dto.getDatInicio());
        entity.setDatFinal(dto.getDatFinal());
        entity.setFlgStatus(dto.getFlgStatus());

        Categoria categoria = categoriaRepository.getOne(dto.getCategoriaId());
        entity.setCategoria(categoria);
        Prefeitura prefeitura = prefeituraRepository.getOne(dto.getPrefeituraId());
        entity.setPrefeitura(prefeitura);


    }
}
