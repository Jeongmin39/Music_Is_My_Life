package com.example.backend.controller;

import com.example.backend.dto.PreferenceArtistDTO;
import com.example.backend.entity.PreferenceArtist;
import com.example.backend.token.JwtTokenUtil;
import com.example.backend.repository.PreferenceArtistRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.PreferenceArtistService;
import com.example.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PreferenceController {

    private final PreferenceArtistService preferenceArtistService;
    private final UserService userService;
    private final PreferenceArtistRepository preferenceArtistRepository;
    private final UserRepository userRepository;

    public PreferenceController(PreferenceArtistService preferenceArtistService, UserService userService,
                                PreferenceArtistRepository preferenceArtistRepository, UserRepository userRepository) {
        this.preferenceArtistService = preferenceArtistService;
        this.userService = userService;
        this.preferenceArtistRepository = preferenceArtistRepository;
        this.userRepository = userRepository;
    }

    //선호 아티스트 조회
    @GetMapping("/users/preference")
    public List<String> preferencePage() {
        String loginId = JwtTokenUtil.getLoginId();
        return preferenceArtistRepository.findNamesByLoginId(loginId);
    }

    //선호 아티스트 추가
    @PostMapping("/users/preference")
    public ResponseEntity<String> savePreference(@RequestBody PreferenceArtistDTO preferenceArtistDTO) {

        PreferenceArtist preferenceArtist = new PreferenceArtist();
        String loginId = JwtTokenUtil.getLoginId();

        preferenceArtist.setLoginId(loginId);
        preferenceArtist.setArtistName(preferenceArtistDTO.getArtistName());
        preferenceArtist.setArtistImageUrl(preferenceArtistDTO.getArtistImageUrl());

        List<String> loginUserPreferList = userRepository.findAllPreferenceArtistsByLoginId(loginId);

        // 중복 확인
        if (loginUserPreferList.contains(preferenceArtistDTO.getArtistName())) {
            throw new IllegalArgumentException("이미 추가된 아티스트입니다.");
        }
        // 개수 확인
        if(loginUserPreferList.size() >= 5) {
            throw new IllegalArgumentException("선호 아티스트는 5개까지만 설정할 수 있습니다.");
        } else {
            preferenceArtistService.savePreferenceArtist(preferenceArtist);
        }
        return ResponseEntity.ok("success");
    }

    //선호 아티스트 삭제
    @DeleteMapping("/prefer/delete")
    public void deletePreference(@RequestParam Long id) {
        preferenceArtistService.deletePreference(id);
    }

    //삭제 다른버전
    @PostMapping("/{preferenceId}/delete")
    public void deleteArtist(@RequestParam Long id) {
        preferenceArtistService.deletePreference(id);
    }
}