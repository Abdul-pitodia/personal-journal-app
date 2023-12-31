package com.ap.controllers;

import com.ap.exceptions.CustomMemoryException;
import com.ap.exceptions.UserDoesNotExistException;
import com.ap.models.AuthRequest;
import com.ap.models.ResponseTO;
import com.ap.models.User;
import com.ap.service.JwtService;
import com.ap.service.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class LoginController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserServiceImpl userService;

    @PostMapping("/authenticate")
    public ResponseEntity<ResponseTO> authenticateUser(@RequestBody AuthRequest authRequest) throws UserDoesNotExistException {
        User user = null;

        try {
           user = userService.getUserFromUserName(authRequest.getUserName());
        } catch (UserDoesNotExistException e) {
            throw new CustomMemoryException(HttpStatus.NOT_FOUND, "Failed to authenticate user", e);
        }

        try {
            Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword()));

            if (authentication.isAuthenticated()){
                return ResponseEntity.ok(new ResponseTO(true, Map.of("token", jwtService.generateToken(authRequest.getUserName()), "user", user), null));
            }
        } catch (AuthenticationException e) {
            throw new CustomMemoryException(HttpStatus.UNAUTHORIZED, "Failed to authenticate user", e);
        }

        return ResponseEntity.ok(null);
    }
}
