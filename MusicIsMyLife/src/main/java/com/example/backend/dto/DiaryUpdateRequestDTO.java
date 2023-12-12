package com.example.backend.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DiaryUpdateRequestDTO {

    private String title;
    private LocalDate date;
    private String content;
    private MultipartFile image;
}
