package com.ap.service;

import com.ap.exceptions.CustomMemoryException;
import com.ap.exceptions.TagNotFoundException;
import com.ap.exceptions.UserDoesNotExistException;
import com.ap.models.Memory;
import com.ap.models.Tag;
import com.ap.models.User;
import com.ap.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class TagServiceImpl {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserServiceImpl userService;

    public Tag createTag(String userId, String tagName){
        Tag tag = new Tag();
        tag.setId(UUID.randomUUID().toString());
        tag.setTagName(tagName);

        try {
            User user = userService.getUserFromUserId(userId);
            user.getTags().add(tag);
            userRepository.save(user);
            return tag;
        } catch (UserDoesNotExistException e) {
            throw new CustomMemoryException(HttpStatus.BAD_REQUEST, "Cannot create tag", e);
        }
    }

    public void deleteTag(String userId, String tagId) {
        try {
            User user = userService.getUserFromUserId(userId);

            Optional<Tag> tag = user.getTags().stream().filter(el -> el.getId().equalsIgnoreCase(tagId)).findFirst();

            if (tag.isEmpty()) throw new TagNotFoundException(HttpStatus.NOT_FOUND, "Tag with requested ID not found");

            for (Memory memory : user.getMemories()) {
              memory.getTags().removeIf(tagItem -> tagItem.getId().equalsIgnoreCase(tagId));
            }

            user.getTags().removeIf(tagItem -> tagItem.getId().equalsIgnoreCase(tagId));
            userRepository.save(user);

        } catch (UserDoesNotExistException e){
            throw new CustomMemoryException(HttpStatus.BAD_REQUEST, "Cannot delete tag", e);
        }

    }

    public List<Tag> fetchTags(String userId){
        try {
            User user = userService.getUserFromUserId(userId);
            return user.getTags();
        } catch (UserDoesNotExistException e){
            throw new CustomMemoryException(HttpStatus.BAD_REQUEST, "Cannot delete tag", e);
        }
    }
}
