package com.ap.service;

import com.ap.exceptions.AppException;
import com.ap.exceptions.CustomMemoryException;
import com.ap.exceptions.UserAlreadyPresentException;
import com.ap.exceptions.UserDoesNotExistException;
import com.ap.models.Memory;
import com.ap.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.ap.repositories.UserRepository;

import java.util.*;

@Service
public class UserServiceImpl {

    @Autowired
    private UserRepository userRepository;


    @Autowired
    private PasswordEncoder passwordEncoder;

    public User addNewUser(User user) {
        Optional<User> userOptional = userRepository.findByUserName(user.getUserName());
        if (userOptional.isPresent()) throw new UserAlreadyPresentException(HttpStatus.BAD_REQUEST, "User with same name exists");
        user.setMemories(new ArrayList<>());
        user.setTags(new ArrayList<>());
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }


    public User getUserFromUserId(String userId) throws UserDoesNotExistException {
        Optional<User> optionalUser = userRepository.findById(userId);

        if (optionalUser.isEmpty()) throw new UserDoesNotExistException("user does not exist");

        return optionalUser.get();
    }

    public User getUserFromUserName(String userName) throws UserDoesNotExistException {
        Optional<User> optionalUser = userRepository.findByUserName(userName);

        if (optionalUser.isEmpty()) throw new UserDoesNotExistException("user does not exist");

        return optionalUser.get();
    }



}
