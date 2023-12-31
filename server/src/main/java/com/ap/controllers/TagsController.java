package com.ap.controllers;

import com.ap.models.ResponseTO;
import com.ap.models.Tag;
import com.ap.service.TagServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tags")
public class TagsController {

    @Autowired
    private TagServiceImpl tagService;

    @GetMapping("/create/{userId}/{tagName}")
    public ResponseEntity<ResponseTO> createTag(@PathVariable("userId") String userId, @PathVariable("tagName") String tagName){
        Tag tag = tagService.createTag(userId, tagName);
        ResponseTO responseTO = new ResponseTO(true, tag, List.of());
        return ResponseEntity.ok(responseTO);
    }

    @GetMapping("/{userId}/fetch")
    public ResponseEntity<ResponseTO> fetchAllTags(@PathVariable("userId") String userId){
        List<Tag> tags = tagService.fetchTags(userId);
        ResponseTO responseTO = new ResponseTO(true, tags, List.of());
        return ResponseEntity.ok(responseTO);
    }

    @DeleteMapping("/delete/{userId}/{tagId}")
    public ResponseEntity<ResponseTO> deleteTag(@PathVariable("userId") String userId, @PathVariable("tagId") String tagId){
        ResponseTO responseTO = new ResponseTO(false, null, List.of());
        tagService.deleteTag(userId, tagId);
        return ResponseEntity.ok(responseTO);
    }
}
