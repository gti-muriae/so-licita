package com.gti.solicita.controllers;

import com.gti.solicita.dto.LicitacaoDTO;
import com.gti.solicita.service.LicitacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/v1/licitacao")
public class LicitacaoController {
    @Autowired
    private LicitacaoService service;

    @PostMapping(value = "/registro")
    public ResponseEntity<LicitacaoDTO> insert(@RequestBody LicitacaoDTO dto) {
        LicitacaoDTO newDto = service.insertLicitacao(dto);
        return ResponseEntity.ok().body(newDto);
    }

    @GetMapping
    public  ResponseEntity<List<LicitacaoDTO>> listAll(){
        List<LicitacaoDTO> lists = service.listAll();
        return ResponseEntity.ok().body(lists);
    }


}
