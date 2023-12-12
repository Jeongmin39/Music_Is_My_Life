package com.example.backend.controller;

import com.example.backend.entity.Recommendation;
import com.example.backend.repository.DiaryRepository;
import com.example.backend.repository.RecommendationRepository;
import com.example.backend.token.JwtTokenUtil;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PlaylistController {

    private final RecommendationRepository recommendationRepository;
    private final DiaryRepository diaryRepository;

    public PlaylistController(RecommendationRepository recommendationRepository, DiaryRepository diaryRepository) {
        this.recommendationRepository = recommendationRepository;
        this.diaryRepository = diaryRepository;
    }

    @GetMapping("/playlists/{year}/{month}")
    public List<Recommendation> monthlyPlaylistPage(@PathVariable ("year") int year, @PathVariable ("month") int month) {
        String loginId = JwtTokenUtil.getLoginId();
        return recommendationRepository.findAllByDiaryDate(year, month, loginId);
    }

    @GetMapping("/playlists/year")
    public List<Integer> yearWithDiary() {
        String loginId = JwtTokenUtil.getLoginId();
        return diaryRepository.findYearsWithDiary(loginId);
    }

    @GetMapping("/playlists/month")
    public List<Integer> monthWithDiary() {
        String loginId = JwtTokenUtil.getLoginId();
        return diaryRepository.findMonthsWithDiary(loginId);
    }
}
