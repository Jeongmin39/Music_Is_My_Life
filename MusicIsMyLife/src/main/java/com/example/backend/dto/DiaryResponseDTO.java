package com.example.backend.dto;

import com.example.backend.entity.Diary;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;

@Getter
@NoArgsConstructor
public class DiaryResponseDTO {

    private Long id;
    private String title;
    private String content;
    private LocalDate createdDate;
    private MultipartFile image;

    @Builder
    public DiaryResponseDTO(Diary diary) {
        this.id = diary.getId();
        this.title = diary.getTitle();
        this.content = diary.getContent();
        this.createdDate = diary.getCreatedDate();
    }
}
