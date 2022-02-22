package com.gti.solicita.controllers.exceptions;

import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Getter
public class ValidationError extends StandardError {
    private final List<FieldMessages> listErrors = new ArrayList<>();

    public void addListError(String fieldName, String message) {
        listErrors.add(new FieldMessages(fieldName, message));
    }

}
