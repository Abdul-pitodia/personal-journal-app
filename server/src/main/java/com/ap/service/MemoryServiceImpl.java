package com.ap.service;

import com.ap.exceptions.CustomMemoryException;
import com.ap.exceptions.UserDoesNotExistException;
import com.ap.models.Memory;
import com.ap.models.Tag;
import com.ap.models.User;
import com.ap.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class MemoryServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    public Memory createMemoryForUser(String userId, Memory memory) {
        try {
            User userInDb = userService.getUserFromUserId(userId);
            String memoryId = UUID.randomUUID().toString();
            memory.setId(memoryId);

            userInDb.getMemories().add(memory);
            User updatedUserInDb = userRepository.save(userInDb);

            return updatedUserInDb.getMemories().stream().filter(item -> item.getId().equalsIgnoreCase(memoryId)).findFirst().orElse(null);

        } catch (UserDoesNotExistException e) {
            throw new CustomMemoryException(HttpStatus.NOT_FOUND, "Unable to create memory", e);
        }
    }

    public Memory updateMemory(String userId, Memory memory) {
        try {
            User userInDb = userService.getUserFromUserId(userId);

            boolean isOldMemoryRemoved = deleteMemoryFromList(userInDb.getMemories(), memory.getId());

            if (!isOldMemoryRemoved)
                throw new CustomMemoryException(HttpStatus.BAD_REQUEST, "Memory with provided Id does not exist");

            userInDb.getMemories().add(memory);

            User userUpdated = userRepository.save(userInDb);

            return userUpdated.getMemories().stream().filter(item -> item.getId().equalsIgnoreCase(memory.getId())).findFirst().orElse(null);

        } catch (UserDoesNotExistException e) {
            throw new CustomMemoryException(HttpStatus.NOT_FOUND, "Unable to update memory", e);
        }
    }

    public void deleteMemoryFromDb(String userId, String memoryId) {
        try {

            User userInDb = userService.getUserFromUserId(userId);
            boolean isMemoryDeleted = deleteMemoryFromList(userInDb.getMemories(), memoryId);
            userRepository.save(userInDb);

        } catch (UserDoesNotExistException e) {
            throw new CustomMemoryException(HttpStatus.NOT_FOUND, "Cannot delete the memory", e);
        }
    }

    public boolean deleteMemoryFromList(List<Memory> memories, String memoryId) {
        return memories.removeIf(item -> item.getId().equals(memoryId));
    }

    public List<Memory> fetchMemoriesByUser(String userId) {
        try {
            User userInDb = userService.getUserFromUserId(userId);
            return userInDb.getMemories();
        } catch (UserDoesNotExistException e) {
            throw new CustomMemoryException(HttpStatus.NOT_FOUND, "Unable to fetch memories for user", e);
        }
    }

    public List<Tag> fetchTagsOfMemory(String memoryId){
        List<User> users = userRepository.findAll();
        List<Tag> tags = new ArrayList<>();

        for (User user : users){
            Optional<Memory> memory = user.getMemories().stream().filter(item -> item.getId().equalsIgnoreCase(memoryId)).findFirst();

            memory.ifPresent(value -> tags.addAll(value.getTags()));
        }

        return tags;
    }
}
