package com.ap.models;

import lombok.*;
import org.bson.types.Binary;
import org.springframework.data.mongodb.core.mapping.DBRef;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Memory {

    private String id;

    private String title;

    private String content;

    private String media;

    private List<Tag> tags;

    private String date;

    private boolean isBookmarked;
}
