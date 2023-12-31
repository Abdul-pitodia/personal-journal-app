package com.ap.exceptions;

import com.ap.models.ResponseTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.util.List;

@ControllerAdvice
public class GlobalExceptionHandling {

    Logger logger = LoggerFactory.getLogger(GlobalExceptionHandling.class);



    @ExceptionHandler(AppException.class)
    public ResponseEntity<ResponseTO> handleTagNotFoundException(AppException e) {
        HttpStatus httpStatus = e.getHttpStatusCode();
        String errorMessage = e.getErrorMessage();
        Throwable rootCause = e.getRootCauseException();

        ResponseTO responseTO = new ResponseTO();
        responseTO.setData(null);

        if (rootCause == null){
            responseTO.setErrors(List.of(errorMessage));
        }
        else responseTO.setErrors(List.of(errorMessage, rootCause.getMessage()));

        responseTO.setSuccess(false);

        logger.error("Error occurred : ", e);

        return ResponseEntity.status(httpStatus).body(responseTO);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ResponseTO> handleTagNotFoundException(AuthenticationException e) {

        ResponseTO responseTO = new ResponseTO();
        responseTO.setData(null);
        responseTO.setErrors(List.of(e.getMessage()));
        responseTO.setSuccess(false);

        logger.error("Authentication Failed : ", e);

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseTO);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ResponseTO> handleTagNotFoundException(Exception e) {

        ResponseTO responseTO = new ResponseTO();
        responseTO.setData(null);
        responseTO.setErrors(List.of(e.getMessage()));
        responseTO.setSuccess(false);

        logger.error("Error occurred : ", e);


        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(responseTO);
    }
}
