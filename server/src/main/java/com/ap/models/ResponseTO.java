package com.ap.models;

import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ResponseTO {

    public boolean success;
    public Object data;
    public List<String> errors;
}
