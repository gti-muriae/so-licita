package com.gti.solicita.service;

import com.gti.solicita.dto.CategoriaDTO;
import com.gti.solicita.entities.Categoria;
import com.gti.solicita.repositories.CategoriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CategoriaService {
    @Autowired
    private CategoriaRepository repository;

    public CategoriaDTO insert(CategoriaDTO dto) {
        Categoria categoria = new Categoria();
        copy(categoria, dto);
        categoria = repository.save(categoria);
        return new CategoriaDTO(categoria);
    }


    private void copy(Categoria categoria, CategoriaDTO dto) {
        categoria.setCategoria(dto.getCategoria());
        categoria.setDescCategoria(dto.getDescCategoria());

    }
}
