package com.gti.solicita.controllers;

import com.gti.solicita.dto.CategoriaDTO;
import com.gti.solicita.service.CategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/categoria")
public class CategoriaController {
    @Autowired
    private CategoriaService service;

    @PostMapping(value = "/registro")
    public ResponseEntity<CategoriaDTO> insert(@RequestBody CategoriaDTO dto) {
        CategoriaDTO categoriaDTO = service.insert(dto);
        return ResponseEntity.ok().body(categoriaDTO);
    }

}
