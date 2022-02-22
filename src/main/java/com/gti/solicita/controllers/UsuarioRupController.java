package com.gti.solicita.controllers;

import com.gti.solicita.dto.UsuarioRupDTO;
import com.gti.solicita.dto.insertDTO.UsuarioRupInsertDTO;
import com.gti.solicita.service.UsuarioService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;


@RestController
@RequestMapping(value = "/v1/usuario")
public class UsuarioRupController {
    private final Logger logger = LoggerFactory.getLogger(UsuarioRupController.class);
    private final UsuarioService service;

    public UsuarioRupController(UsuarioService service) {
        this.service = service;
    }

    @PostMapping(value = "/registro")
    public ResponseEntity<UsuarioRupDTO> registroUsuario(@Valid @RequestBody UsuarioRupInsertDTO dto) {
        UsuarioRupDTO newDto = service.insertUsuario(dto);
        return ResponseEntity.ok().body(newDto);
    }

    @GetMapping(value = "/{cnpj}")
    public ResponseEntity<UsuarioRupDTO> findUsuarioByCnpj(@PathVariable Integer cnpj) {
        UsuarioRupDTO dto = service.findByUsuarioCnpj(cnpj);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @GetMapping(value = "/buscar/{email}")
    public ResponseEntity<UsuarioRupDTO> findByUsuarioEmail(@PathVariable String email) {
        logger.info(email);
        UsuarioRupDTO dto = service.findByEmail(email);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }
}
