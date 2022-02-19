package com.gti.solicita.controllers;

import com.gti.solicita.dto.PrefeituraDTO;
import com.gti.solicita.service.PrefeituraService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/v1/prefeitura")
public class PrefeituraController {
    private final PrefeituraService service;

    public PrefeituraController(PrefeituraService service) {
        this.service = service;
    }

    @GetMapping()
    public ResponseEntity<Page<PrefeituraDTO>> findAll(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                       @RequestParam(value = "lines", defaultValue = "10") Integer lines,
                                                       @RequestParam(value = "orderBy", defaultValue = "nome") String orderBy,
                                                       @RequestParam(value = "direction", defaultValue = "ASC") String direction
    ) {
        PageRequest request = PageRequest.of(page, lines, Sort.Direction.valueOf(direction), orderBy);
        Page<PrefeituraDTO> list = service.findllPrefeitura(request);
        return ResponseEntity.ok().body(list);
    }

    @PostMapping(value = "/registro")
    public ResponseEntity<PrefeituraDTO> registro(@RequestBody PrefeituraDTO dto) {
        dto = service.registro(dto);
        return ResponseEntity.ok().body(dto);
    }
}
