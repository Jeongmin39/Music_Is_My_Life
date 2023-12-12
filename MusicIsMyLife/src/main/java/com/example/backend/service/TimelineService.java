package com.example.backend.service;

import com.example.backend.dto.CursorResult;
import com.example.backend.repository.DiaryRepository;
import com.example.backend.token.JwtTokenUtil;
import org.springframework.stereotype.Service;
import com.example.backend.entity.Diary;

import org.springframework.data.domain.Pageable;

import java.time.LocalDate;
import java.util.List;

@Service
public class TimelineService {

    private final DiaryRepository diaryRepository;

    public TimelineService(DiaryRepository diaryRepository) {
        this.diaryRepository = diaryRepository;
    }

    public CursorResult<Diary> get(LocalDate date, Pageable page) {
        final List<Diary> diaryList = getDiaries(date, page);
        final LocalDate lastDateOfList = diaryList.isEmpty() ?
                null : diaryList.get(diaryList.size() - 1).getDate();
        return new CursorResult<>(diaryList, hasNext(lastDateOfList));
    }

    private List<Diary> getDiaries(LocalDate date, Pageable page) {
        String loginId = JwtTokenUtil.getLoginId();
        return date == null ?
                this.diaryRepository.findAllByOrderByDateDesc(loginId, page) :
                this.diaryRepository.findByDateBeforeOrderByDateDesc(date, loginId, page);
    }

    private Boolean hasNext(LocalDate date) {
        String loginId = JwtTokenUtil.getLoginId();
        if (date == null) return false;
        return this.diaryRepository.existsByDateBefore(date, loginId);
    }
}
