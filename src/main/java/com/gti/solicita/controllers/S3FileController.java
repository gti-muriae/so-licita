package com.gti.solicita.controllers;

import com.gti.solicita.service.S3FileService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping(value = "v1/s3/")
public class S3FileController {
    private final S3FileService service;

    public S3FileController(S3FileService service) {
        this.service = service;
    }
    @PostMapping(value = "/upload")
    public ResponseEntity<Object> uploadFile(@RequestPart(value = "file") MultipartFile file) {
        boolean result = service.uploadFile(file);
        Map<String, String> message = new HashMap<>();
        message.put("sucess", "Arquivo enviado com sucesso");
        message.put("error", "Arquivo não enviado!");
        System.out.println(result);
        if (result) {
            return ResponseEntity.ok().body(message.get("sucess"));
        }
        return ResponseEntity.badRequest().body(message.get("error"));

    }

}
