package com.example.backend.controller;

import com.example.backend.dto.*;
import com.example.backend.entity.Diary;
import com.example.backend.entity.Recommendation;
import com.example.backend.token.JwtTokenUtil;
import com.example.backend.repository.DiaryRepository;
import com.example.backend.repository.PreferenceArtistRepository;
import com.example.backend.service.*;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.time.LocalDate;
import java.util.Optional;

@RestController
@AllArgsConstructor
@RequestMapping("/diaries")
public class DiaryController {

    private final DiaryService diaryService;
    private final UserService userService;
    private final ChatService chatService;
    private final ImageUploadService imageUploadService;
    private final RecommendationService recommendationService;
    private final DiaryRepository diaryRepository;
    private final PreferenceArtistRepository preferenceArtistRepository;

    // 일기 작성 페이지
    @GetMapping
    public ResponseEntity<String> writeDiaryPage() {
        return ResponseEntity.ok("success");
    }

    // 일기 작성 & 저장
    @Transactional
    @PostMapping("/save")
    public String saveAndRecommend(DiaryWriteDTO diaryWriteDTO) throws IOException {
        return diaryService.saveDiary(diaryWriteDTO);
    }

    //사용자 선택곡 저장
    @Transactional
    @PostMapping("/recommend")
    public ResponseEntity<String> saveRecommendation(@RequestBody SelectedSongDTO selectedSongDTO) throws IOException {
        Recommendation recommendation = new Recommendation();
        recommendation.setSelectedArtistName(selectedSongDTO.getSelectedArtistName());
        recommendation.setSelectedSongName(selectedSongDTO.getSelectedSongName());
        recommendation.setAlbumImageUrl(selectedSongDTO.getAlbumImageUrl());
        recommendation.setSongUri(selectedSongDTO.getSongUri());

        Optional<Diary> optionalDiary = diaryService.getDiaryByDateAndUser(selectedSongDTO.getDate());
        System.out.println(optionalDiary.get().getDate());
        if (optionalDiary.isPresent()) {
            Diary diary = optionalDiary.get();
            recommendation.setDiary(diary);
            diary.setRecommendation(recommendation);
            recommendationService.saveRecommendation(recommendation);
            return ResponseEntity.ok("success");
        } else {
            return ResponseEntity.ok("작성된 일기가 없음");
        }
    }

    //일기 수정 GET
    @GetMapping("/{date}/update")
    public ResponseEntity<String> updateDiaryPage(@PathVariable("date") String date) {
        return ResponseEntity.ok("UpdatePage 반환 success");
    }

    //일기 수정 POST
    @Transactional
    @PostMapping("/update")
    public String updateDiary(DiaryUpdateRequestDTO diaryUpdateRequestDTO) throws IOException {
        return diaryService.updateDiary(diaryUpdateRequestDTO);
    }

    //일기 삭제
    //@PostMapping("/{diaryId}/delete")
    //public String deleteDiary(@PathVariable Long id) {
    //    diaryService.deleteDiary(id);
    //    return "redirect:/";
    //upda}

    //일기 삭제 버전
    @PostMapping("/{date}/delete")
    public ResponseEntity<String> deleteDiary(@PathVariable("date") String date) {
        LocalDate selectedDate = LocalDate.parse(date);
        String loginId = JwtTokenUtil.getLoginId();
        Optional<Diary> optionalDiary = diaryService.getDiaryByDateAndUser(selectedDate);
        Diary diary = optionalDiary.get();
        diaryService.deleteDiary(diary.getId());
        return ResponseEntity.ok("일기 삭제 완료");
    }
}