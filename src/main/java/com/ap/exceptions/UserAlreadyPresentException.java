package com.ap.exceptions;

import org.springframework.http.HttpStatus;

public class UserAlreadyPresentException extends AppException{

    public UserAlreadyPresentException(HttpStatus status, String errorMessage){
        super(status, errorMessage);
    }
}
