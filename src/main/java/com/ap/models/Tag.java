package com.ap.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("tags")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class Tag {

    @Id
    private String id;

    private String tagName;

}
