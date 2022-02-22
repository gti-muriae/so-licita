package com.gti.solicita.controllers.exceptions;

import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Getter
@Setter
public class StandardError {
    private Instant instant;
    private Integer status;
    private String error;
    private String message;
    private String path;

    public StandardError() {
    }
}
