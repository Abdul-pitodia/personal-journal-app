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

    @GetMapping("/create/{tagName}")
    public ResponseEntity<ResponseTO> createTag(@PathVariable("tagName") String tagName){
        Tag tag = tagService.createTag(tagName);
        ResponseTO responseTO = new ResponseTO(true, tag, List.of());
        return ResponseEntity.ok(responseTO);
    }

    @GetMapping("/fetch")
    public ResponseEntity<ResponseTO> fetchAllTags(){
        List<Tag> tags = tagService.fetchTags();
        ResponseTO responseTO = new ResponseTO(true, tags, List.of());
        return ResponseEntity.ok(responseTO);
    }

    @DeleteMapping("/delete/{tagId}")
    public ResponseEntity<ResponseTO> deleteTag(@PathVariable("tagId") String tagId){
        ResponseTO responseTO = new ResponseTO(false, null, List.of());
        tagService.deleteTag(tagId);
        return ResponseEntity.ok(responseTO);
    }
}
