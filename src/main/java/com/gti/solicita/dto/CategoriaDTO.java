package com.gti.solicita.dto;

import com.gti.solicita.entities.Categoria;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class CategoriaDTO implements Serializable {
    private static final long serialVersionUID = 1L;
    private Long id;
    private String categoria;
    private String descCategoria;
    public CategoriaDTO() {
    }

    public CategoriaDTO(Long id, String categoria, String descCategoria) {
        this.id = id;
        this.categoria = categoria;
        this.descCategoria = descCategoria;
    }

    public CategoriaDTO(Categoria categoria) {
        this.id = categoria.getId();
        this.categoria = categoria.getCategoria();
        this.descCategoria = categoria.getDescCategoria();
    }


}
