package com.gti.solicita.controllers;

import com.gti.solicita.dto.AdminRupDTO;
import com.gti.solicita.dto.insertDTO.AdminRupInsertDTO;
import com.gti.solicita.service.AdminService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/v1/admin")
public class AdminRupController {
    private final AdminService service;
    public AdminRupController(AdminService service) {
        this.service = service;
    }

    @PostMapping(value = "/registro")
    public ResponseEntity<AdminRupDTO> registroAdmin(@RequestBody AdminRupInsertDTO json) {
        AdminRupDTO admin = service.insertAdmin(json);
        return ResponseEntity.ok().body(admin);
    }
}
