package com.ap.models;

import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document("users")
@Data
@AllArgsConstructor
@NoArgsConstructor
@Getter
public class User {

    @Id
    private String userId;

    private String userName;

    private String email;

    private List<Memory> memories;

    private String password;
}
