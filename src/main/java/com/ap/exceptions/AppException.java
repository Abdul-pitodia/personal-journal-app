package com.ap.exceptions;

import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
public class AppException extends RuntimeException{

    private final HttpStatus httpStatusCode;
    private final String errorMessage;
    private final Throwable rootCauseException;


    protected AppException(HttpStatus httpStatusCode, String errorMessage, Throwable rootCauseEx){
        this.httpStatusCode = httpStatusCode;
        this.errorMessage = errorMessage;
        this.rootCauseException = rootCauseEx;
    }

    protected AppException(HttpStatus httpStatusCode, String errorMessage){
        this(httpStatusCode, errorMessage, null);
    }

}
