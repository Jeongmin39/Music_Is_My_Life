package com.example.backend.controller;

import com.example.backend.dto.DiaryDateDTO;
import com.example.backend.entity.Diary;
import com.example.backend.repository.DiaryRepository;
import com.example.backend.service.DiaryService;
import com.example.backend.token.JwtTokenUtil;
import org.springframework.data.repository.cdi.Eager;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
public class CalendarController {

    private final DiaryService diaryService;
    private final DiaryRepository diaryRepository;

    public CalendarController(DiaryService diaryService, DiaryRepository diaryRepository) {
        this.diaryService = diaryService;
        this.diaryRepository = diaryRepository;
    }

    @GetMapping("/calendar")
    public List<LocalDate> calendarPage() {
        String loginId = JwtTokenUtil.getLoginId();
        System.out.println("일기 작성된 날짜 리스트로: " + diaryRepository.findDatesWithDiary(loginId));
        System.out.println("일기 작성된 년도만 리스트로: " + diaryRepository.findYearsWithDiary(loginId));
        System.out.println("일기 작성된 월만 리스트로: " + diaryRepository.findMonthsWithDiary(loginId));
        return diaryRepository.findDatesWithDiary(loginId);
    }

    @GetMapping("/diaries/{date}")
    public ResponseEntity<?> showDiaryByDate(@PathVariable("date") String date) {
        LocalDate selectedDate = LocalDate.parse(date);
        Optional<Diary> optionalDiary = diaryService.getDiaryByDateAndUser(selectedDate);

        if (optionalDiary.isPresent()) {
            return ResponseEntity.ok(optionalDiary.get());
        } else {
            return ResponseEntity.ok("작성된 일기가 없음");
        }
    }
}
