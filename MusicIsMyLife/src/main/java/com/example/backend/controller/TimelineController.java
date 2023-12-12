package com.example.backend.controller;

import com.example.backend.dto.CursorResult;
import com.example.backend.entity.Diary;
import com.example.backend.service.TimelineService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@RequiredArgsConstructor
public class TimelineController {

    private static final int DEFAULT_SIZE = 7;
    private final TimelineService timelineService;

    @GetMapping("/timeline")
    public CursorResult<Diary> getDiaries(LocalDate date, Integer size) {
        if (size == null) size = DEFAULT_SIZE;
        return this.timelineService.get(date, PageRequest.of(0, size));
    }
}
