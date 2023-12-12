
package com.example.backend.service;

import com.example.backend.dto.*;
import com.example.backend.entity.Diary;
import com.example.backend.entity.User;
import com.example.backend.repository.DiaryRepository;
import com.example.backend.repository.PreferenceArtistRepository;
import com.example.backend.token.JwtTokenUtil;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DiaryService {

    private final DiaryRepository diaryRepository;
    private final PreferenceArtistRepository preferenceArtistRepository;
    private final ImageUploadService imageUploadService;
    private final UserService userService;
    private final ChatService chatService;

    public DiaryService(DiaryRepository diaryRepository, ImageUploadService imageUploadService,
                        UserService userService, PreferenceArtistRepository preferenceArtistRepository,
                        ChatService chatService) {
        this.diaryRepository = diaryRepository;
        this.imageUploadService = imageUploadService;
        this.userService = userService;
        this.preferenceArtistRepository = preferenceArtistRepository;
        this.chatService = chatService;
    }

    // 일기 저장(생성)
    public String saveDiary(DiaryWriteDTO diaryWriteDTO) throws IOException {

        //일기 저장
        Diary diary = new Diary();
        diary.setTitle(diaryWriteDTO.getTitle());
        diary.setDate(diaryWriteDTO.getDate());
        diary.setContent(diaryWriteDTO.getContent());
        String imageUrl = imageUploadService.uploadImage(diaryWriteDTO.getImage());
        diary.setImage(imageUrl);

        // Jwt Token에서 loginId 추출
        String loginId = JwtTokenUtil.getLoginId();
        diary.setLoginId(loginId);
        diaryRepository.save(diary);

        // 노래 추천 받기
        StringBuilder combinedQuestionBuilder = new StringBuilder();
        combinedQuestionBuilder.append(diaryWriteDTO.getContent());
        String emotionInfo = "반영해야 할 감정은 " + diaryWriteDTO.getEmotion();
        combinedQuestionBuilder.append(emotionInfo);

        List<String> artistNames = preferenceArtistRepository.findNamesByLoginId(loginId);
        String artistInfo = "선호하는 가수는 " + String.join(", ", artistNames);
        combinedQuestionBuilder.append(artistInfo);

        combinedQuestionBuilder.append("참고해서 어울리는 한국노래 다섯곡 추천하라");
        combinedQuestionBuilder.append("형식은 번호. 가수명-제목으로 해줘");
        String combinedQuestion = combinedQuestionBuilder.toString();

        String recommendSongs = chatService.getChatResponse(combinedQuestion);
        return recommendSongs;
    }

    // 일기 개별 조회
    public Optional<Diary> findOneDiary(Long id) {
        return diaryRepository.findById(id);
    }

    // 일기 전체 조회
    public List<Diary> findAll() {
        return diaryRepository.findAll();
    }

    // 날짜, 사용자로 일기 조회
    public Optional<Diary> getDiaryByDateAndUser(LocalDate date) {
        String loginId = JwtTokenUtil.getLoginId();
        return diaryRepository.findByDateAndUser(date, loginId);
    }

    // 일기 수정
    @Transactional
    public String updateDiary(DiaryUpdateRequestDTO diaryUpdateRequestDTO) throws IOException {
        String loginId = JwtTokenUtil.getLoginId();
        Optional<Diary> optionalDiary = diaryRepository.findByDateAndUser(diaryUpdateRequestDTO.getDate(), loginId);

        if (optionalDiary.isPresent()) {
            //일기 저장
            Diary diary = optionalDiary.get();
            diary.setTitle(diaryUpdateRequestDTO.getTitle());
            diary.setDate(diaryUpdateRequestDTO.getDate());
            diary.setContent(diaryUpdateRequestDTO.getContent());
            String imageUrl = imageUploadService.uploadImage(diaryUpdateRequestDTO.getImage());
            diary.setImage(imageUrl);
            diaryRepository.save(diary);
        }
        // 노래 추천 받기
        StringBuilder combinedQuestionBuilder = new StringBuilder();
        combinedQuestionBuilder.append(diaryUpdateRequestDTO.getContent());

        List<String> artistNames = preferenceArtistRepository.findNamesByLoginId(loginId);
        String artistInfo = "선호하는 가수는 " + String.join(", ", artistNames);
        combinedQuestionBuilder.append(artistInfo);

        combinedQuestionBuilder.append("참고해서 어울리는 한국노래 다섯곡 추천하라");
        combinedQuestionBuilder.append("형식은 번호. 가수명-제목으로 해줘");
        String combinedQuestion = combinedQuestionBuilder.toString();

        String recommendSongs = chatService.getChatResponse(combinedQuestion);
        return recommendSongs;
    }

    // 일기 삭제
    @Transactional
    public void deleteDiary(Long id) {
        diaryRepository.deleteById(id);
    }
}


