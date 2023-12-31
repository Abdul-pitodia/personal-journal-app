package com.ap.service;

import com.ap.exceptions.TagNotFoundException;
import com.ap.models.Memory;
import com.ap.models.Tag;
import com.ap.models.User;
import com.ap.repositories.TagRepository;
import com.ap.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class TagServiceImpl {

    @Autowired
    private TagRepository tagRepository;

    @Autowired
    private UserRepository userRepository;


    public Tag createTag(String tagName){
        Tag tag = new Tag();
        tag.setTagName(tagName);
        return tagRepository.save(tag);
    }

    public void deleteTag(String tagId) {
        Optional<Tag> tag = tagRepository.findById(tagId);

        if (tag.isEmpty()) throw new TagNotFoundException(HttpStatus.NOT_FOUND, "Tag with requested ID not found");

        List<User> usersInDb = userRepository.findAll();

        for (User user : usersInDb) {
            for (Memory memory : user.getMemories()) {
                boolean removed = memory.getTags().removeIf(tagItem -> tagItem.getId().equalsIgnoreCase(tagId));
                if (removed) userRepository.save(user);
            }
        }

        tagRepository.deleteById(tagId);

    }

    public List<Tag> fetchTags(){
        return tagRepository.findAll().stream().toList();
    }
}
