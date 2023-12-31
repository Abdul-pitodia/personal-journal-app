package com.ap.exceptions;

import org.springframework.http.HttpStatus;

public class CustomMemoryException extends AppException{

    public CustomMemoryException(HttpStatus httpStatus, String message, Throwable ex){
        super(httpStatus, message, ex);
    }

    public CustomMemoryException(HttpStatus httpStatus, String message){
        super(httpStatus, message);
    }
}
