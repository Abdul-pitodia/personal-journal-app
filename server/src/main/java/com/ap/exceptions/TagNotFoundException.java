package com.ap.exceptions;

import org.springframework.http.HttpStatus;

public class TagNotFoundException extends AppException{

    public TagNotFoundException(HttpStatus httpStatus, String message){
        super(httpStatus, message);
    }
}
