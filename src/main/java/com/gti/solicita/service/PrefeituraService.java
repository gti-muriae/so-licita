package com.gti.solicita.service;

import com.gti.solicita.dto.PrefeituraDTO;
import com.gti.solicita.entities.Prefeitura;
import com.gti.solicita.repositories.PrefeituraRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class PrefeituraService {
    private final PrefeituraRepository repository;

    public PrefeituraService(PrefeituraRepository repository) {
        this.repository = repository;
    }

    @Transactional(readOnly = true)
    public Page<PrefeituraDTO> findllPrefeitura(PageRequest pageRequest) {
        Page<Prefeitura> list = repository.findAll(pageRequest);
        return list.map(PrefeituraDTO::new);
    }

    @Transactional
    public PrefeituraDTO registro(PrefeituraDTO dto) {
        Prefeitura prefeitura = new Prefeitura();
        copyToEntity(dto, prefeitura);
        prefeitura = repository.save(prefeitura);
        return new PrefeituraDTO(prefeitura);
    }


    private void copyToEntity(PrefeituraDTO dto, Prefeitura prefeitura) {
        prefeitura.setNome(dto.getNome());
        prefeitura.setCidade(dto.getCidade());
        prefeitura.setBairro(dto.getBairro());
        prefeitura.setEndereco(dto.getEndereco());
        prefeitura.setComplemento(dto.getComplemento());
        prefeitura.setContato(dto.getContato());
        prefeitura.setUf(dto.getUf());
        prefeitura.setCodCep(dto.getCodCep());
    }
}
