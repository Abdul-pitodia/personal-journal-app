package com.ap.controllers;

import com.ap.models.Memory;
import com.ap.models.ResponseTO;
import com.ap.models.Tag;
import com.ap.service.MemoryServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.BsonBinarySubType;
import org.bson.types.Binary;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/memory")
public class MemoryController {

    @Autowired
    private MemoryServiceImpl memoryService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<ResponseTO> createMemoryForUser(
                                                      @RequestBody Memory memory,
                                                      @PathVariable("userId") String userId) throws IOException {
        Memory memorySavedInDb = memoryService.createMemoryForUser(userId, memory);
        return ResponseEntity.ok(new ResponseTO(true, memorySavedInDb, List.of()));
    }

    @PostMapping("/update/{userId}")
    public ResponseEntity<ResponseTO> updateMemoryForUser(
                                                      @RequestBody Memory memory,
                                                      @PathVariable("userId") String userId) throws IOException {
        Memory memorySavedInDb = memoryService.updateMemory(userId, memory);
        return ResponseEntity.ok(new ResponseTO(true, memorySavedInDb, List.of()));
    }

    @DeleteMapping("/delete/{userId}/{memoryId}")
    public ResponseEntity<ResponseTO> deleteMemoryForUser( @PathVariable("memoryId") String memoryId,
                                                          @PathVariable("userId") String userId) throws IOException {
        memoryService.deleteMemoryFromDb(userId, memoryId);
        return ResponseEntity.ok(new ResponseTO(true, null, List.of()));
    }

    @GetMapping("/fetchMemories/{userId}")
    public ResponseEntity<ResponseTO> fetchAllMemoriesForUser(@PathVariable("userId") String userId){
        List<Memory> memories = memoryService.fetchMemoriesByUser(userId);
        return ResponseEntity.ok(new ResponseTO(true, memories, null));
    }

    @GetMapping("/fetchTags/{memoryId}")
    public ResponseEntity<ResponseTO> getTags(@PathVariable("memoryId") String memoryId){
        List<Tag> tags = memoryService.fetchTagsOfMemory(memoryId);
        return ResponseEntity.ok(new ResponseTO(true, tags, null));
    }
}
