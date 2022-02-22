package com.gti.solicita.controllers.exceptions;

import com.gti.solicita.service.exceptions.ConstraintException;
import com.gti.solicita.service.exceptions.DatabaseException;
import com.gti.solicita.service.exceptions.ResourceNotException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import javax.validation.ConstraintViolationException;
import java.time.Instant;

@ControllerAdvice
public class ResourceExceptionHandle {
    @ExceptionHandler(ResourceNotException.class)
    public ResponseEntity<StandardError> entityNotFound(ResourceNotException e, HttpServletRequest request) {
        HttpStatus status = HttpStatus.NOT_FOUND;
        StandardError error = new StandardError();
        error.setInstant(Instant.now());
        error.setStatus(status.value());
        error.setError("Controller not found");
        error.setMessage(e.getMessage());
        error.setPath(request.getRequestURI());
        return ResponseEntity.status(status.value()).body(error);
    }

    @ExceptionHandler(DatabaseException.class)
    public ResponseEntity<StandardError> databaseError(DatabaseException exception, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError error = new StandardError();
        error.setInstant(Instant.now());
        error.setStatus(status.value());
        error.setError("Database exception");
        error.setMessage(exception.getMessage());
        error.setPath(request.getRequestURI());
        return ResponseEntity.status(status.value()).body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationError> notValidationException(MethodArgumentNotValidException exception, HttpServletRequest request) {
        HttpStatus status = HttpStatus.UNPROCESSABLE_ENTITY;
        ValidationError error = new ValidationError();
        error.setInstant(Instant.now());
        error.setStatus(status.value());
        error.setError("validation exception");
        error.setMessage(exception.getMessage());
        error.setPath(request.getRequestURI());

        for (FieldError f : exception.getBindingResult().getFieldErrors()) {
            error.addListError(f.getField(), f.getDefaultMessage());
        }
        return ResponseEntity.status(status.value()).body(error);
    }

    @ExceptionHandler(ConstraintException.class)
    public ResponseEntity<StandardError> constraintViolationException(ConstraintException exception, HttpServletRequest request) {
        HttpStatus status = HttpStatus.BAD_REQUEST;
        StandardError error = new StandardError();
        error.setInstant(Instant.now());
        error.setStatus(status.value());
        error.setError("Constraint exception");
        error.setMessage(exception.getMessage());
        error.setPath(request.getRequestURI());
        return ResponseEntity.status(status.value()).body(error);
    }

}
