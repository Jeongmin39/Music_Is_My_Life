package com.example.backend.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class DiaryWriteDTO {

    @NonNull
    private String title;
    @NonNull
    private LocalDate date;
    @NonNull
    private String content;
    private MultipartFile image;
    private String emotion;
}

