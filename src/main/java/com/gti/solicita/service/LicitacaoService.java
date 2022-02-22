package com.gti.solicita.service;

import com.gti.solicita.dto.CategoriaDTO;
import com.gti.solicita.dto.LicitacaoDTO;
import com.gti.solicita.entities.Categoria;
import com.gti.solicita.entities.Licitacao;
import com.gti.solicita.entities.Prefeitura;
import com.gti.solicita.entities.UsuarioRup;
import com.gti.solicita.repositories.CategoriaRepository;
import com.gti.solicita.repositories.LicitacaoRepository;
import com.gti.solicita.repositories.PrefeituraRepository;
import com.gti.solicita.repositories.UsuarioRupRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class LicitacaoService {
    private static final Logger logger = LoggerFactory.getLogger(LicitacaoService.class);
    @Autowired
    private LicitacaoRepository licitacaoRepository;

    @Autowired
    private CategoriaRepository categoriaRepository;

    @Autowired
    private PrefeituraRepository prefeituraRepository;

    @Autowired
    UsuarioRupRepository repository;

    @Transactional
    public LicitacaoDTO insertLicitacao(LicitacaoDTO dto) {
        Licitacao licitacao = new Licitacao();
        copy(licitacao, dto);
        licitacao = licitacaoRepository.save(licitacao);
        sendEmailUsuario(dto);
        return new LicitacaoDTO(licitacao);

    }

    @Transactional(readOnly = true)
    public List<LicitacaoDTO> listAll() {
        List<Licitacao> lists = licitacaoRepository.findAll();
        return lists.stream().map(LicitacaoDTO::new).collect(Collectors.toList());

    }

    private void copy(Licitacao entity, LicitacaoDTO dto) {
        entity.setNumLicitacao(dto.getNumLicitacao());
        entity.setDescLicitacao(dto.getDescLicitacao());
        entity.setDatAmm(dto.getDatAmm());
        entity.setDatInicio(dto.getDatInicio());
        entity.setDatFinal(dto.getDatFinal());
        entity.setFlgStatus(dto.getFlgStatus());


        Prefeitura prefeitura = prefeituraRepository.getOne(dto.getPrefeituraId());
        entity.setPrefeitura(prefeitura);
        entity.getCategorias().clear();
        for (CategoriaDTO categoriaDTO : dto.getCategorias()) {
            Categoria categoria = categoriaRepository.getOne(categoriaDTO.getId());
            entity.getCategorias().add(categoria);
        }


    }

    private void sendEmailUsuario(LicitacaoDTO dto) {
        for (CategoriaDTO categoriaDTO : dto.getCategorias()) {
            List<UsuarioRup> list = repository.listUserCategoria(categoriaDTO.getId());
            for (UsuarioRup usuarioRup : list) {
                System.out.println(usuarioRup.getEmail());
            }
        }
    }
}
