package com.example.backend.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DiaryUpdateResponseDTO {

    private String title;
    private String content;
    private MultipartFile image;
}
